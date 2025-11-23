import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(request: Request) {
  try {
    const payload = await getPayload({ config })
    const body = await request.json()

    // Server-side validation for required fields
    const errors: string[] = []

    // Validate Personal Info
    if (!body.personalInfo?.applicantName?.trim()) {
      errors.push('Full name is required')
    }
    if (!body.personalInfo?.email?.trim()) {
      errors.push('Email is required')
    } else {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(body.personalInfo.email)) {
        errors.push('Valid email address is required')
      }
    }
    if (!body.personalInfo?.phone?.trim()) {
      errors.push('Phone number is required')
    }

    // Validate Academic Info
    if (!body.academicInfo?.university?.trim()) {
      errors.push('University/institution name is required')
    }
    if (!body.academicInfo?.department) {
      errors.push('Department is required')
    }
    if (!body.academicInfo?.level) {
      errors.push('Academic level is required')
    }

    // Validate Research Interests
    if (!body.researchInterests || !Array.isArray(body.researchInterests) || body.researchInterests.length === 0) {
      errors.push('At least one research interest is required')
    } else {
      const hasValidInterest = body.researchInterests.some((item: any) => item.area?.trim())
      if (!hasValidInterest) {
        errors.push('At least one research interest with an area is required')
      }
    }

    // Validate Resume
    if (!body.resume?.resumeLink?.trim()) {
      errors.push('Resume link is required')
    }

    // Validate Statement of Purpose (Lexical format)
    if (!body.statementOfPurpose || typeof body.statementOfPurpose !== 'object') {
      errors.push('Statement of purpose is required')
    } else if (!body.statementOfPurpose.root || !body.statementOfPurpose.root.children) {
      errors.push('Statement of purpose is required')
    }

    // Return validation errors if any
    if (errors.length > 0) {
      return NextResponse.json({ 
        error: 'Validation failed', 
        details: errors 
      }, { status: 400 })
    }

    const result = await payload.create({
      collection: 'recruitment',
      data: body,
      overrideAccess: true,
    })

    return NextResponse.json({ success: true, id: result.id })
  } catch (error) {
    console.error('Recruitment submission error:', error)
    return NextResponse.json({ 
      error: 'Failed to submit application.',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
