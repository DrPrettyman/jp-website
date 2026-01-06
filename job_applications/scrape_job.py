#!/usr/bin/env python3
"""
Scrape full job description from a URL.

Usage:
    python3 scrape_job.py <url>

Returns the full text content of the job posting, stripped of HTML tags.
Use this to get complete job descriptions that WebFetch may have summarized.
"""

import sys
import urllib.request
import re

def scrape_job(url):
    """Fetch and extract text content from a job posting URL."""
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }

    req = urllib.request.Request(url, headers=headers)

    try:
        response = urllib.request.urlopen(req, timeout=30)
        html = response.read().decode('utf-8')
    except Exception as e:
        print(f"Error fetching URL: {e}", file=sys.stderr)
        sys.exit(1)

    # Remove script and style tags
    html_clean = re.sub(r'<script[^>]*>.*?</script>', '', html, flags=re.DOTALL)
    html_clean = re.sub(r'<style[^>]*>.*?</style>', '', html_clean, flags=re.DOTALL)

    # Remove HTML tags, replacing with newlines
    html_clean = re.sub(r'<[^>]+>', '\n', html_clean)

    # Clean up whitespace
    html_clean = re.sub(r'\n+', '\n', html_clean)
    html_clean = re.sub(r'[ \t]+', ' ', html_clean)

    # Decode HTML entities
    html_clean = html_clean.replace('&amp;', '&')
    html_clean = html_clean.replace('&lt;', '<')
    html_clean = html_clean.replace('&gt;', '>')
    html_clean = html_clean.replace('&quot;', '"')
    html_clean = html_clean.replace('&#39;', "'")
    html_clean = html_clean.replace('&nbsp;', ' ')

    # Extract lines and clean
    lines = [l.strip() for l in html_clean.split('\n') if l.strip()]

    return '\n'.join(lines)


if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: python3 scrape_job.py <url>", file=sys.stderr)
        sys.exit(1)

    url = sys.argv[1]
    content = scrape_job(url)
    print(content)
