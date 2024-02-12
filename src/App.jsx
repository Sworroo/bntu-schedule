import React from 'react'
import {
	BrowserRouter as Router,
	Navigate,
	Routes,
	Route,
} from 'react-router-dom'
import General from './components/general'

export default function App() {

	return (
		<RouteSelect />
	)
}

const RouteSelect = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<General />} />
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
		</Router>
	)
}
