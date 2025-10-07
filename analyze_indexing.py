import pandas as pd
import re
from collections import defaultdict

# Read the Excel file
df = pd.read_excel('/home/ubuntu/upload/indexedpages.xlsx', sheet_name='Table')

print("=== ANALYSIS OF NON-INDEXED PAGES ===\n")
print(f"Total non-indexed pages: {len(df)}")
print(f"Last crawled dates range: {df['Last crawled'].min()} to {df['Last crawled'].max()}\n")

# Analyze URL patterns
url_patterns = defaultdict(list)
issues = defaultdict(list)

for url in df['URL']:
    # Check for different URL patterns and potential issues
    
    # Pattern 1: /clinic/ vs /clinics/ (old vs new structure)
    if '/clinic/' in url and '/clinics/' not in url:
        issues['Old URL Structure (/clinic/)'].append(url)
    
    # Pattern 2: Specific clinic pages
    if '/clinics/' in url:
        clinic_name = url.split('/clinics/')[-1]
        issues['Clinic Pages'].append(url)
    
    # Pattern 3: Review pages
    if '/reviews/' in url:
        issues['Review Pages'].append(url)
    
    # Pattern 4: Education pages
    if '/education/' in url:
        issues['Education Pages'].append(url)
    
    # Pattern 5: Conditions pages
    if '/conditions/' in url:
        issues['Condition Pages'].append(url)

print("=== ISSUES BREAKDOWN ===\n")

for issue_type, urls in issues.items():
    print(f"{issue_type}: {len(urls)} pages")
    for url in urls[:5]:  # Show first 5 examples
        print(f"  - {url}")
    if len(urls) > 5:
        print(f"  ... and {len(urls) - 5} more")
    print()

# Check for duplicate content issues (same page with different URLs)
print("=== POTENTIAL DUPLICATE CONTENT ISSUES ===\n")

# Look for /clinic/ vs /clinics/ duplicates
clinic_old = [url for url in df['URL'] if '/clinic/' in url and '/clinics/' not in url]
clinic_new = [url for url in df['URL'] if '/clinics/' in url]

print(f"Old clinic URLs (/clinic/): {len(clinic_old)}")
print(f"New clinic URLs (/clinics/): {len(clinic_new)}")

# Check for potential duplicates
for old_url in clinic_old:
    clinic_slug = old_url.split('/clinic/')[-1]
    potential_new_url = old_url.replace('/clinic/', '/clinics/')
    if any(potential_new_url in new_url for new_url in clinic_new):
        print(f"DUPLICATE FOUND:")
        print(f"  Old: {old_url}")
        print(f"  New: {potential_new_url}")
        print()

