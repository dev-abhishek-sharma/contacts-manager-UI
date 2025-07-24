// Configuration for the external API
const EXTERNAL_API_BASE_URL = 'http://localhost:3000'
const ORGANISATION_ID = 'org_abc123'

export async function GET() {
  try {
    // Fetch data from external endpoint
    const response = await fetch(`${EXTERNAL_API_BASE_URL}/organisations/${ORGANISATION_ID}/contacts`)
    
    if (!response.ok) {
      throw new Error(`External API responded with status: ${response.status}`)
    }
    
    const data = await response.json()
    
    return Response.json({
      success: true,
      data: data,
      total: Array.isArray(data) ? data.length : 0
    })
  } catch (error) {
    console.error('Error fetching contacts from external API:', error)
    
    // Return fallback data if external API is not available
    const fallbackData = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, New York, NY 10001'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '+1 (555) 987-6543',
        address: '456 Oak Ave, Los Angeles, CA 90210'
      }
    ]
    
    return Response.json({
      success: true,
      data: fallbackData,
      total: fallbackData.length,
      warning: 'Using fallback data - external API not available'
    })
  }
}

// Optional: Add POST method to create new contacts via external API
export async function POST(request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.phone || !body.address) {
      return Response.json(
        { 
          success: false, 
          error: 'Missing required fields: name, email, phone, address' 
        },
        { status: 400 }
      )
    }
    
    // Send POST request to external API
    const response = await fetch(`${EXTERNAL_API_BASE_URL}/organisations/${ORGANISATION_ID}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    
    if (!response.ok) {
      throw new Error(`External API responded with status: ${response.status}`)
    }
    
    const data = await response.json()
    
    return Response.json({
      success: true,
      data: data,
      message: 'Contact created successfully'
    })
  } catch (error) {
    console.error('Error creating contact via external API:', error)
    return Response.json(
      { 
        success: false, 
        error: 'Failed to create contact - external API not available' 
      },
      { status: 500 }
    )
  }
}
