#!/bin/bash

echo "Testing Contacts Manager API Integration"
echo "========================================"

# Test the internal API endpoint
echo "1. Testing internal API endpoint..."
curl -s http://localhost:3030/api/contacts | jq '.' || echo "Internal API failed"

echo ""
echo "2. Testing external API endpoint..."
curl -s http://localhost:3000/organisations/org_abc123/contacts | jq '.' || echo "External API not available (this is expected if external service is not running)"

echo ""
echo "3. Testing in browser..."
echo "Open http://localhost:3030 to see the contacts table"
echo ""
echo "Expected behavior:"
echo "- If external API (localhost:3000) is running: Shows data from external API"
echo "- If external API is not running: Shows fallback data with warning message"
