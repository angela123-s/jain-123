/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#10B981', // Green QL Emerald
                secondary: '#0F172A', // Green QL Charcoal
                success: '#10B981',
                danger: '#F43F5E',
                background: '#F8FAFC',
                card: '#FFFFFF',
            }
        },
    },
    plugins: [],
}
