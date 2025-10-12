import { supabase } from '../lib/supabase';
import { AssessmentResponses, AssessmentResult, AssessmentAnalytics, ClinicMatchScore } from '../types/eligibility';

export class EligibilityService {
  private static generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  static getSessionId(): string {
    const storageKey = 'ctq_session_id';
    let sessionId = localStorage.getItem(storageKey);

    if (!sessionId) {
      sessionId = this.generateSessionId();
      localStorage.setItem(storageKey, sessionId);
    }

    return sessionId;
  }

  static async saveProgress(
    sessionId: string,
    currentStep: number,
    responses: AssessmentResponses
  ): Promise<void> {
    try {
      const { data: existing } = await supabase
        .from('eligibility_assessments')
        .select('id')
        .eq('session_id', sessionId)
        .maybeSingle();

      const assessmentData = {
        session_id: sessionId,
        current_step: currentStep,
        responses: responses,
        email: responses.email || null,
        name: responses.name || null,
        condition: responses.condition as string || null,
        severity: responses.severity ? parseInt(responses.severity as string) : null,
        completed: false,
        updated_at: new Date().toISOString()
      };

      if (existing) {
        await supabase
          .from('eligibility_assessments')
          .update(assessmentData)
          .eq('id', existing.id);
      } else {
        await supabase
          .from('eligibility_assessments')
          .insert({
            ...assessmentData,
            started_at: new Date().toISOString()
          });
      }

      localStorage.setItem('ctq_eligibility_progress', JSON.stringify({
        currentStep,
        responses,
        sessionId,
        savedAt: Date.now()
      }));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }

  static async trackStepCompletion(
    assessmentId: string,
    stepNumber: number,
    stepName: string,
    responseValue: string,
    timeSpent: number
  ): Promise<void> {
    try {
      await supabase
        .from('assessment_analytics')
        .insert({
          assessment_id: assessmentId,
          step_number: stepNumber,
          step_name: stepName,
          response_value: responseValue,
          time_spent_seconds: timeSpent,
          timestamp: new Date().toISOString()
        });
    } catch (error) {
      console.error('Error tracking step:', error);
    }
  }

  static async saveAssessmentResult(
    sessionId: string,
    responses: AssessmentResponses,
    eligibilityStatus: string,
    eligibilityConfidence: number,
    clinicMatches: ClinicMatchScore[]
  ): Promise<string | null> {
    try {
      const completedAt = new Date().toISOString();
      const startedAtStr = localStorage.getItem('ctq_assessment_started');
      const startedAt = startedAtStr ? new Date(parseInt(startedAtStr)) : new Date();
      const completionTime = Math.floor((new Date(completedAt).getTime() - startedAt.getTime()) / 1000);

      const { data, error } = await supabase
        .from('eligibility_assessments')
        .update({
          responses: responses,
          condition: responses.condition as string,
          severity: responses.severity ? parseInt(responses.severity as string) : null,
          eligibility_status: eligibilityStatus,
          eligibility_confidence: eligibilityConfidence,
          matched_clinics: clinicMatches,
          completed: true,
          current_step: 15,
          completed_at: completedAt,
          completion_time_seconds: completionTime
        })
        .eq('session_id', sessionId)
        .select('id')
        .single();

      if (error) throw error;

      if (data && clinicMatches.length > 0) {
        const matchRecords = clinicMatches.map((match, index) => ({
          assessment_id: data.id,
          clinic_id: match.clinicId,
          clinic_name: match.clinicName,
          match_score: match.score,
          match_percentage: match.percentage,
          match_reasons: match.reasons,
          score_breakdown: match.breakdown,
          ranking: index + 1
        }));

        await supabase
          .from('assessment_clinic_matches')
          .insert(matchRecords);
      }

      localStorage.removeItem('ctq_eligibility_progress');
      localStorage.removeItem('ctq_assessment_started');

      return data?.id || null;
    } catch (error) {
      console.error('Error saving assessment result:', error);
      return null;
    }
  }

  static async recordDropoff(
    sessionId: string,
    lastCompletedStep: number,
    responses: AssessmentResponses
  ): Promise<void> {
    try {
      await supabase
        .from('assessment_dropoffs')
        .insert({
          session_id: sessionId,
          email: responses.email as string || null,
          last_completed_step: lastCompletedStep,
          total_steps: 15,
          responses_json: responses,
          dropped_at: new Date().toISOString()
        });
    } catch (error) {
      console.error('Error recording dropoff:', error);
    }
  }

  static loadProgress(): { currentStep: number; responses: AssessmentResponses; sessionId: string } | null {
    try {
      const saved = localStorage.getItem('ctq_eligibility_progress');
      if (!saved) return null;

      const progress = JSON.parse(saved);
      const savedAt = progress.savedAt || 0;
      const hoursSinceLastSave = (Date.now() - savedAt) / (1000 * 60 * 60);

      if (hoursSinceLastSave > 24) {
        localStorage.removeItem('ctq_eligibility_progress');
        return null;
      }

      return {
        currentStep: progress.currentStep || 1,
        responses: progress.responses || {},
        sessionId: progress.sessionId || this.getSessionId()
      };
    } catch (error) {
      console.error('Error loading progress:', error);
      return null;
    }
  }

  static clearProgress(): void {
    localStorage.removeItem('ctq_eligibility_progress');
    localStorage.removeItem('ctq_assessment_started');
  }
}
