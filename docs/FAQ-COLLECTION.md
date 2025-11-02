# FAQ Collection

## Overview
The FAQ (Frequently Asked Questions) collection is an admin-only feature for managing questions and answers displayed on the homepage.

## Access Control
- **Create**: Admin only
- **Read (Admin Panel)**: Admin only  
- **Update**: Admin only
- **Delete**: Admin only
- **Read (Public API)**: Everyone can view published FAQs on the website

## Features
- Admin-only CRUD operations
- Students cannot see, edit, or delete FAQs in the admin panel
- Public API endpoint for displaying published FAQs on the homepage
- Category-based organization
- Custom ordering
- Publish/unpublish toggle
- Tagging system

## Fields
- **Question** (required): The FAQ question
- **Answer** (required): The detailed answer
- **Category** (required): General, Research, Admissions, Publications, Projects, Collaboration, Other
- **Order** (required): Display order (lower numbers appear first)
- **Published**: Toggle to show/hide on website
- **Tags**: Optional tags for additional categorization

## Usage

### Admin Panel
1. Login as an admin
2. Navigate to Administrative → FAQs
3. Click "Create New" to add a new FAQ
4. Fill in the question, answer, category, and order
5. Toggle "Published" to make it visible on the website
6. Save

### Homepage Display
FAQs are automatically fetched and displayed on the homepage FAQ section. Only published FAQs are shown, sorted by the order field.

## API Endpoint
- **GET** `/api/faqs` - Returns all published FAQs sorted by order

## Technical Details
- Collection slug: `faq`
- Admin group: `Administrative`
- Access control based on user role
- Public read access for published FAQs via API
