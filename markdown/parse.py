#!/usr/bin/env python3
"""
HTML to Markdown Converter using Beautiful Soup
Converts HTML files to clean Markdown format
"""

from bs4 import BeautifulSoup
import re


def html_to_markdown(html_content):
    """
    Convert HTML content to Markdown format
    
    Args:
        html_content (str): HTML content as string
        
    Returns:
        str: Converted Markdown content
    """
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Remove head section and get body
    body = soup.find('body')
    if not body:
        body = soup  # If no body tag, use entire soup
    
    markdown_lines = []
    
    # Process each top-level element in body
    for element in body.children:
        if element.name is None:  # Skip text nodes
            continue
            
        markdown_text = convert_element_to_markdown(element)
        if markdown_text.strip():
            markdown_lines.append(markdown_text.strip())
    
    # Join with double newlines and clean up
    markdown = '\n\n'.join(markdown_lines)
    
    # Clean up extra whitespace
    markdown = re.sub(r'\n\s*\n\s*\n', '\n\n', markdown)
    markdown = markdown.strip()
    
    return markdown


def convert_element_to_markdown(element):
    """
    Convert a single HTML element to Markdown
    
    Args:
        element: BeautifulSoup element
        
    Returns:
        str: Markdown representation
    """
    if element.name == 'div':
        # Process div contents
        content = []
        for child in element.children:
            if child.name:
                content.append(convert_element_to_markdown(child))
            elif child.string and child.string.strip():
                content.append(child.string.strip())
        return '\n'.join(filter(None, content))
    
    elif element.name == 'p':
        return convert_text_with_links(element)
    
    elif element.name in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']:
        level = int(element.name[1])
        text = convert_text_with_links(element)
        return '#' * (level+1) + ' ' + text
    
    elif element.name == 'ul':
        items = []
        for li in element.find_all('li', recursive=False):
            item_text = convert_text_with_links(li)
            items.append('- ' + item_text)
        return '\n'.join(items)
    
    elif element.name == 'ol':
        items = []
        for i, li in enumerate(element.find_all('li', recursive=False), 1):
            item_text = convert_text_with_links(li)
            items.append(f'{i}. ' + item_text)
        return '\n'.join(items)
    
    elif element.name == 'blockquote':
        text = convert_text_with_links(element)
        lines = text.split('\n')
        return '\n'.join('> ' + line for line in lines)
    
    elif element.name in ['strong', 'b']:
        return '**' + element.get_text() + '**'
    
    elif element.name in ['em', 'i']:
        return '*' + element.get_text() + '*'
    
    elif element.name == 'code':
        return '`' + element.get_text() + '`'
    
    elif element.name == 'pre':
        code_element = element.find('code')
        if code_element:
            return '```\n' + code_element.get_text() + '\n```'
        else:
            return '```\n' + element.get_text() + '\n```'
    
    else:
        return convert_text_with_links(element)


def convert_text_with_links(element):
    """
    Convert text content including links to Markdown
    
    Args:
        element: BeautifulSoup element
        
    Returns:
        str: Text with Markdown-formatted links
    """
    result = ""
    
    for child in element.children:
        if child.name == 'a':
            href = child.get('href', '')
            text = child.get_text()
            if href:
                if href.startswith("/"):
                    href = "https://j.prettyman.me" + href
                result += f'[{text}]({href})'
            else:
                result += text
        elif child.name:
            # Recursively handle nested elements
            result += convert_element_to_markdown(child)
        else:
            # Plain text
            result += str(child)
    
    # Clean up whitespace
    result = re.sub(r'\s+', ' ', result).strip()
    return result