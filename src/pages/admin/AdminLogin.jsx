// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// function AdminLogin() {
//   const [formData, setFormData] = useState({ email: '', password: '' })
//   const [isRegister, setIsRegister] = useState(false)
//   const navigate = useNavigate()

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       const endpoint = isRegister
//         ? 'http://localhost:5000/api/admin/register'
//         : 'http://localhost:5000/api/admin/login'

//       const res = await fetch(endpoint, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       })

//       const data = await res.json()

//       if (res.ok) {
//         localStorage.setItem('token', data.token)
//         alert(isRegister ? 'Registration successful' : 'Login successful')
//         navigate('/admin/dashboard')
//       } else {
//         alert(data.message || 'Request failed')
//       }
//     } catch (err) {
//       console.error('Error:', err)
//       alert('Something went wrong')
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-semibold mb-6 text-center">
//           {isRegister ? 'Admin Register' : 'Admin Login'}
//         </h2>

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="mb-4 px-4 py-2 w-full border border-gray-300 rounded"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           className="mb-6 px-4 py-2 w-full border border-gray-300 rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
//         >
//           {isRegister ? 'Register' : 'Login'}
//         </button>

//         <p
//           onClick={() => setIsRegister(!isRegister)}
//           className="mt-4 text-sm text-center text-blue-600 cursor-pointer"
//         >
//           {isRegister ? 'Already have an account? Login' : 'No account? Register'}
//         </p>
//       </form>
//     </div>
//   )
// }

// export default AdminLogin
