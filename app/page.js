'use client'

import { useState, useEffect } from 'react'

export default function HomePage() {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [warning, setWarning] = useState(null)

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        setError(null)
        setWarning(null)
        
        const response = await fetch('/api/contacts')
        const result = await response.json()
        
        if (result.success) {
          setUsers(result.data)
          if (result.warning) {
            setWarning(result.warning)
          }
        } else {
          setError(result.error || 'Failed to fetch contacts')
        }
      } catch (err) {
        setError('Failed to fetch contacts')
        console.error('Error fetching contacts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm) ||
    user.address.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container">
      <h1>Contacts Manager</h1>
      <p className="api-info">Fetching data from: http://localhost:3000/organisations/org_abc123/contacts</p>
      
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          disabled={loading}
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading">
          Loading contacts from external API...
        </div>
      )}

      {/* Warning State */}
      {warning && (
        <div className="warning">
          ⚠️ {warning}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="error">
          Error: {error}
        </div>
      )}

      {/* Users Table */}
      {!loading && !error && (
        <div className="table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* No results message */}
      {!loading && !error && filteredUsers.length === 0 && searchTerm && (
        <div className="no-results">
          No contacts found matching "{searchTerm}"
        </div>
      )}

      {/* Total count */}
      {!loading && !error && (
        <div className="total-count">
          Showing {filteredUsers.length} of {users.length} contacts
        </div>
      )}
    </div>
  )
}
