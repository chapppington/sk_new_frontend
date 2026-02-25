import { API_URL } from '@/constants'
import axios, { CreateAxiosDefaults } from 'axios'

const axiosOptions: CreateAxiosDefaults = {
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
}

export const axiosPublic = axios.create(axiosOptions)