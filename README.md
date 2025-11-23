# UNमNĀ – Elevating the Mind

**UNमNĀ** is a professional mental health counseling platform committed to making therapy accessible, empathetic, and empowering. Founded by **Dr. Jyothi S**, this platform integrates leading mental healthcare principles with global best practices.

## 📖 About The Project

This repository contains the source code for the UNमNĀ website. The site serves as a digital gateway for individuals and educational institutions to access mental health services.

**Key Features:**
* **Responsive Design:** Built with Tailwind CSS for a mobile-friendly experience across all devices.
* **Modular Architecture:** Uses vanilla JavaScript to dynamically load reusable components (Header and Footer) for easier maintenance.
* **Service Showcases:** Detailed pages for individual counseling, school programs, and team expertise.
* **Local Python Server:** Includes a custom Python script to serve the static files locally with automatic port detection.

## 🛠️ Tech Stack

* **HTML5**: Semantic markup for structure.
* **Tailwind CSS**: Utility-first CSS framework (loaded via CDN).
* **JavaScript (ES6)**: Handles DOM manipulation and component loading.
* **Python**: Used for the local development server.
* **FontAwesome**: For UI icons.

## 🚀 How to Run Locally

You can run this website on your local machine using the included Python script.

1.  **Prerequisites**: Ensure you have Python installed on your system.
2.  **Clone or Download** this repository.
3.  **Navigate** to the project folder in your terminal or command prompt.
4.  **Run the server**:
    ```bash
    python serve.py
    ```
    *Note: If the script tries to open `welcome.html` and fails, please update line 18 of `serve.py` to point to `index.html`.*

Alternatively, you can simply open `index.html` in your browser, though the dynamic header/footer loading requires a local server environment (like the one provided) to work correctly due to CORS security policies.

## 📂 Project Structure

* `index.html`: The landing page.
* `about.html`, `services.html`, `expertise.html`, `school-program.html`, `contact.html`: Information pages.
* `header.html` & `footer.html`: Reusable HTML components.
* `main.js`: Handles the logic for loading components and mobile navigation.
* `serve.py`: A utility script to host the site locally.
* `logo.png`: Brand asset.

## 🌟 Vision

To transform the one-dimensional view of therapy into a multidimensional healing experience, creating a space where seeking guidance is seen as a sign of strength.

---
&copy; UNमNĀ – Elevating the Mind. All rights reserved.
