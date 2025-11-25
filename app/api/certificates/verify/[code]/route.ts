import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

// Disable caching for this route
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params
    const payload = await getPayload({ config })

    // Find certificate by short code
    const certificates = await payload.find({
      collection: 'certificates',
      where: {
        shortCode: {
          equals: code.toUpperCase(),
        },
        isActive: {
          equals: true,
        },
      },
      depth: 2,
      limit: 1,
    })

    if (certificates.docs.length === 0) {
      return NextResponse.json(
        { error: 'Certificate not found or inactive' },
        { status: 404 }
      )
    }

    const cert = certificates.docs[0] as any

    // Format the certificate data
    const formattedCert = {
      id: cert.id,
      certificateName: cert.certificateName,
      recipientName: cert.recipientName,
      achievement: cert.achievement,
      reason: cert.reason,
      issuedBy: cert.issuedBy,
      issuedAt: cert.issuedAt,
      shortCode: cert.shortCode,
      certificateFile: typeof cert.certificateFile === 'object' && cert.certificateFile?.url
        ? {
            url: cert.certificateFile.url,
            alt: cert.certificateFile.alt || cert.certificateName,
            mimeType: cert.certificateFile.mimeType,
          }
        : null,
      tags: cert.tags || [],
    }

    return NextResponse.json(
      { certificate: formattedCert },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    )
  } catch (error) {
    console.error('Error verifying certificate:', error)
    return NextResponse.json(
      { error: 'Failed to verify certificate' },
      { status: 500 }
    )
  }
}
