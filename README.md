# 🌍 Country Explorer

A modern web application to explore countries and their cities with interactive UI, real-time data, and smart filtering.

---

## 🚀 Features

### 🌎 Countries
- Search countries by name
- Filter by region (Asia, Europe, etc.)
- Sort by:
  - Population 📊
  - Area 🌐
- View detailed country info:
  - Flag
  - Capital
  - Languages
  - Population
  - Area

### 🏙️ Cities
- Click on any country to view its cities
- Displays random 30–40 cities
- Fetches real-time data from Wikipedia
- Click a city → opens Google search 🔍

### ❤️ Favorites
- Add countries & cities to favorites
- Stored using localStorage
- View all favorites in one place

### 🎨 UI Features
- Clean card-based layout
- Hover effects & animations
- Fallback UI for missing images 🌍
- Light/Dark mode toggle 🌗

---

## 🛠️ Tech Stack

- HTML
- CSS
- JavaScript (Vanilla JS)
- REST APIs:
  - 🌍 REST Countries API
  - 🏙️ CountriesNow API
  - 📚 Wikipedia API

---

## ⚙️ How It Works

1. Fetches all countries from API
2. Applies:
   - Search → `filter()`
   - Region filter → `filter()`
   - Sorting → `sort()`
3. On click:
   - Navigates to cities page
4. Cities page:
   - Fetch cities list
   - Get details from Wikipedia
   - Filter invalid results

---

## 📂 Project Structure
Country-Explorer/
│── index.html # Countries page
│── index2.html # Cities page
│── style.css # Styling
│── script.js # Countries logic
│── script2.js # Cities logic


---

## 🧠 Key Concepts Used

- Array Higher Order Functions:
  - `filter()`
  - `map()`
  - `sort()`
  - `find()`
- DOM Manipulation
- API Integration
- Local Storage
- Event Handling

---

## 💡 Challenges Solved

- ❌ Invalid API results (e.g., "Force" instead of city)
- ❌ Missing images → handled with fallback UI
- ❌ Undefined data → sanitized before display
- ❌ Performance with large datasets

---

## 🔥 Future Improvements

- Pagination / Infinite Scroll
- Better search suggestions
- City detail modal instead of redirect
- Improved animations
- Deploy on Vercel / Netlify

---

## 🌐 Live Demo
(https://smart-country-explorer.vercel.app/)

---

## 👩‍💻 Author

Muskaan Ramrakhyani

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!