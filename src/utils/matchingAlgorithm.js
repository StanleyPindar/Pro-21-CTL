// Simplified MVP Matching Algorithm for CompareTheLeaf
// Uses existing Supabase data structure with lightweight scoring

class MVPMatchingAlgorithm {
  constructor(clinics = [], strainData = null) {
    this.clinics = clinics;
    this.strainData = strainData;
    
    // Scoring weights (total = 100%)
    this.weights = {
      condition: 0.40,    // 40% - Primary condition match
      budget: 0.25,       // 25% - Budget alignment
      priorities: 0.20,   // 20% - Treatment priorities
      location: 0.10,     // 10% - Location preference
      urgency: 0.05       // 5% - Urgency/availability
    };
  }

  // Main matching function
  calculateMatches(quizResponses = {}, advancedResponses = null) {
    const clinicScores = this.clinics.map(clinic => {
      const score = this.calculateClinicScore(clinic, quizResponses, advancedResponses);
      const matchReasons = this.generateMatchReasons(clinic, quizResponses, score);
      
      return {
        clinic,
        score: score.total,
        matchPercentage: this.convertToPercentage(score.total),
        matchReasons,
        breakdown: score.breakdown
      };
    });

    // Sort by score and return top matches
    return clinicScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 3); // Return top 3 for MVP
  }

  // Calculate individual clinic score
  calculateClinicScore(clinic = {}, quizResponses = {}, advancedResponses = null) {
    const breakdown = {
      condition: this.scoreConditionMatch(clinic, quizResponses, advancedResponses),
      budget: this.scoreBudgetMatch(clinic, quizResponses),
      priorities: this.scorePriorities(clinic, quizResponses),
      location: this.scoreLocation(clinic, quizResponses),
      urgency: this.scoreUrgency(clinic, quizResponses)
    };

    // Apply strain boost if advanced responses available
    let strainBoost = 0;
    if (advancedResponses && this.strainData) {
      strainBoost = this.calculateStrainBoost(clinic, quizResponses.condition, advancedResponses);
    }

    const total = Object.keys(breakdown).reduce((sum, key) => {
      return sum + (breakdown[key] * this.weights[key]);
    }, 0) + strainBoost;

    return { total, breakdown, strainBoost };
  }

  // Condition matching with specialization scoring
  scoreConditionMatch(clinic = {}, quizResponses = {}, advancedResponses = null) {
    const condition = quizResponses?.condition;
    const specialties = clinic.services?.specialties || [];
    
    // Direct specialization match
    const conditionMap = {
      'chronic-pain': ['chronic pain', 'pain management', 'fibromyalgia'],
      'anxiety': ['anxiety', 'mental health', 'depression', 'gad'],
      'epilepsy': ['epilepsy', 'seizures', 'neurological'],
      'ptsd': ['ptsd', 'trauma', 'mental health'],
      'cancer': ['cancer', 'oncology', 'chemotherapy'],
      'sleep': ['sleep disorders', 'insomnia'],
      'arthritis': ['arthritis', 'inflammation', 'rheumatoid']
    };

    const relevantSpecs = conditionMap[condition] || [];
    const hasSpecialization = specialties.some(spec => 
      relevantSpecs.some(relevant => 
        spec.toLowerCase().includes(relevant.toLowerCase())
      )
    );

    // Base score for specialization
    let score = hasSpecialization ? 90 : 60;

    // Boost for advanced condition details
    if (advancedResponses && advancedResponses['condition-specifics']) {
      score += 10; // Bonus for detailed matching
    }

    return Math.min(score, 100);
  }

  // Budget alignment scoring
  scoreBudgetMatch(clinic = {}, quizResponses = {}) {
    const budget = quizResponses?.budget;
    const consultationPrice = clinic.pricing?.initialConsultation?.price || 0;
    const annualCost = clinic.pricing?.estimatedAnnualCost?.average || 0;
    
    // Estimate monthly cost (consultation + prescription estimate)
    const estimatedMonthlyCost = (consultationPrice / 6) + (annualCost / 12);

    const budgetRanges = {
      'under-150': { min: 0, max: 150 },
      '150-250': { min: 150, max: 250 },
      '250-400': { min: 250, max: 400 },
      '400-plus': { min: 400, max: 1000 },
      'need-info': { min: 0, max: 1000 } // Neutral for info seekers
    };

    const range = budgetRanges[budget];
    if (!range) return 50;

    // Score based on how well clinic fits budget
    if (estimatedMonthlyCost >= range.min && estimatedMonthlyCost <= range.max) {
      return 100;
    } else if (estimatedMonthlyCost < range.min) {
      return 85; // Under budget is good
    } else {
      // Over budget - penalize based on how much over
      const overAmount = estimatedMonthlyCost - range.max;
      return Math.max(30, 100 - (overAmount / range.max * 50));
    }
  }

  // Treatment priorities scoring
  scorePriorities(clinic = {}, quizResponses = {}) {
    const priorities = quizResponses?.priorities || [];
    if (!Array.isArray(priorities)) return 50;

    let score = 0;
    const priorityScores = {
      'specialization': this.scoreSpecializationPriority(clinic),
      'cost': this.scoreCostPriority(clinic),
      'speed': this.scoreSpeedPriority(clinic),
      'support': this.scoreSupportPriority(clinic),
      'variety': this.scoreVarietyPriority(clinic),
      'discretion': this.scoreDiscretionPriority(clinic),
      'location': this.scoreLocationPriority(clinic)
    };

    // Weight by priority ranking (first choice = 3x, second = 2x, third = 1x)
    priorities.forEach((priority, index) => {
      const weight = 3 - index; // 3, 2, 1
      score += (priorityScores[priority] || 50) * weight;
    });

    // Normalize to 0-100 scale
    const maxPossibleScore = 100 * (3 + 2 + 1); // 600
    return (score / maxPossibleScore) * 100;
  }

  // Location scoring
  scoreLocation(clinic = {}, quizResponses = {}) {
    const userLocation = quizResponses?.location;
    const clinicLocation = clinic.overview?.address?.city || '';

    if (userLocation === 'virtual') {
      // Check if clinic offers virtual consultations
      return clinic.services?.consultationTypes.includes('video') ? 100 : 70;
    }

    // Simple location matching
    const locationMap = {
      'london': ['london', 'south east'],
      'midlands': ['midlands', 'birmingham'],
      'north': ['manchester', 'leeds', 'liverpool', 'north'],
      'scotland': ['scotland', 'edinburgh', 'glasgow'],
      'wales': ['wales', 'cardiff'],
      'ni': ['northern ireland', 'belfast']
    };

    const userRegions = locationMap[userLocation] || [];
    const hasLocationMatch = userRegions.some(region => 
      clinicLocation.toLowerCase().includes(region.toLowerCase())
    );

    if (hasLocationMatch) return 100;
    if (clinic.services?.consultationTypes?.includes('video')) return 85;
    return 45;
  }

  // Urgency/availability scoring
  scoreUrgency(clinic = {}, quizResponses = {}) {
    const urgency = quizResponses?.urgency;
    const waitingTime = clinic.patientExperience?.nextAvailableAppointment || '14 days';
    
    // Extract number of days from string like "3 days" or "2 weeks"
    let days = 14;
    if (typeof waitingTime === 'string') {
      const match = waitingTime.match(/(\d+)/);
      if (match) {
        days = parseInt(match[1], 10);
        if (waitingTime.includes('week')) {
          days *= 7;
        }
      }
    }

    const urgencyMap = {
      'this-week': 7,
      'two-weeks': 14,
      'month': 30,
      'researching': 60
    };

    const desiredTime = urgencyMap[urgency] || 30;
    
    if (days <= desiredTime) {
      return 100;
    } else {
      // Penalize based on how much longer the wait is
      const penalty = (days - desiredTime) / desiredTime * 50;
      return Math.max(30, 100 - penalty);
    }
  }

  // Strain boost calculation (uses existing clinic_condition_match_count view)
  calculateStrainBoost(clinic = {}, condition = '', advancedResponses = null) {
    if (!this.strainData) return 0;

    // This would query the clinic_condition_match_count view
    // For MVP, we'll simulate this with a simple boost
    const conditionStrainMap = {
      'chronic-pain': 15,
      'anxiety': 12,
      'epilepsy': 20,
      'ptsd': 10,
      'cancer': 18,
      'sleep': 8,
      'arthritis': 12
    };

    return conditionStrainMap[condition] || 5;
  }

  // Priority scoring helpers
  scoreSpecializationPriority(clinic = {}) {
    const specialtyCount = clinic.services?.specialties?.length || 0;
    if (specialtyCount >= 3) return 100;
    if (specialtyCount >= 2) return 85;
    if (specialtyCount >= 1) return 70;
    return 50;
  }

  scoreCostPriority(clinic = {}) {
    const cost = clinic.pricing?.initialConsultation?.price || 200;
    if (cost <= 100) return 100;
    if (cost <= 150) return 90;
    if (cost <= 200) return 75;
    if (cost <= 250) return 60;
    return 40;
  }

  scoreSpeedPriority(clinic = {}) {
    const waitTime = clinic.patientExperience?.nextAvailableAppointment || '14 days';
    let days = 14;
    if (typeof waitTime === 'string') {
      const match = waitTime.match(/(\d+)/);
      if (match) {
        days = parseInt(match[1], 10);
        if (waitTime.includes('week')) {
          days *= 7;
        }
      }
    }
    if (days <= 3) return 100;
    if (days <= 7) return 90;
    if (days <= 14) return 75;
    if (days <= 21) return 60;
    return 40;
  }

  scoreSupportPriority(clinic) {
    // Check for support features in clinic data
    let score = 50;
    if (clinic.services?.followUpSupport) score += 25;
    if (clinic.services?.educationalResources) score += 15;
    if (clinic.services?.urgentAppointments) score += 10;
    return Math.min(100, score);
  }

  scoreVarietyPriority(clinic) {
    // Check strain variety from pharmacy products
    const flowerCount = clinic.pharmacy?.availableProducts?.flowers?.length || 0;
    const oilCount = clinic.pharmacy?.availableProducts?.oils?.length || 0;
    const totalProducts = flowerCount + oilCount;
    
    if (totalProducts >= 10) return 100;
    if (totalProducts >= 5) return 85;
    if (totalProducts >= 3) return 70;
    if (totalProducts >= 1) return 55;
    return 40;
  }

  scoreDiscretionPriority(clinic) {
    let score = 70; // Base discretion score
    if (clinic.services?.consultationTypes?.includes('video')) score += 15;
    if (clinic.services?.homeDelivery) score += 10;
    if (clinic.overview?.address?.city === 'Virtual' || clinic.overview?.address?.city === 'UK Wide') score += 5;
    return Math.min(100, score);
  }

  scoreLocationPriority(clinic) {
    const hasPhysicalLocation = clinic.overview?.address?.city && 
                               clinic.overview?.address?.city !== 'Virtual' && 
                               clinic.overview?.address?.city !== 'UK Wide';
    const hasVirtual = clinic.services?.consultationTypes?.includes('video');
    
    if (hasPhysicalLocation && hasVirtual) return 100;
    if (hasPhysicalLocation) return 85;
    if (hasVirtual) return 75;
    return 50;
  }

  // Convert raw score to percentage
  convertToPercentage(score) {
    return Math.min(100, Math.max(0, Math.round(score)));
  }

  // Generate human-readable match reasons
  generateMatchReasons(clinic = {}, quizResponses = {}, score = {}) {
    const reasons = [];
    
    if (score?.breakdown?.condition > 80 && quizResponses?.condition) {
      reasons.push(`Specializes in ${quizResponses.condition.replace('-', ' ')} treatment`);
    }
    
    if (score?.breakdown?.budget > 85) {
      reasons.push('Fits within your budget range');
    }
    
    if (score?.breakdown?.urgency > 85) {
      reasons.push('Available within your preferred timeframe');
    }
    
    if (score?.breakdown?.location > 85) {
      reasons.push('Convenient location or virtual options');
    }

    if (score?.strainBoost > 10) {
      reasons.push('Has strains specifically for your condition');
    }

    return reasons.length > 0 ? reasons : ['Good overall match for your needs'];
  }
}

export default MVPMatchingAlgorithm;