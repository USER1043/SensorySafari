# 🦁 Sensory Safari - Animal Learning App

An interactive and accessible animal learning web application designed with autism-friendly features. Learn about amazing animals through fun activities including an animal gallery, matching games, and quizzes!

![Sensory Safari](https://images.unsplash.com/photo-1560807707-8cc77767d783?w=1200&h=400&fit=crop)

---

## ✨ Features

### 🎨 Interactive Animal Gallery

- Browse through a collection of **34 different animals**
- Filter animals by category: **Farm Animals**, **Wild Animals**, **Birds**, and **Insects**
- Click on any animal to see high-quality images and learn fun facts
- Listen to authentic animal sounds

### 🎯 Matching Game

- Test your knowledge by matching animal pictures with their names
- Earn points for each correct match (10 points per pair)
- Enjoy gentle audio feedback for correct and incorrect matches
- Subtle confetti celebrations for autism-friendly engagement
- New game button to shuffle and play again

### ❓ Animal Quiz

- 10-question quiz to test your animal knowledge
- See your score and track your progress
- Best streak tracking to encourage improvement
- Listen to animal sounds during each question
- Get immediate feedback with fun facts after each answer
- Play again to keep improving

### ♿ Accessibility Features

- **Autism-friendly design**: Gentle colors, no jarring animations
- **Large touch targets**: Minimum 44px touch areas for easy interaction
- **High contrast support**: Clear visibility in high contrast mode
- **Reduced motion**: Respects `prefers-reduced-motion` settings
- **Keyboard navigation**: Full keyboard accessibility with visible focus indicators
- **Screen reader friendly**: Proper ARIA labels and semantic HTML
- **Gentle audio feedback**: Calming sounds instead of harsh alerts

---

## 🛠️ Tech Stack

| Technology       | Purpose                                              |
| ---------------- | ---------------------------------------------------- |
| **React 19**     | Modern UI library for building the interface         |
| **React Router** | Client-side routing for navigation                   |
| **Vite**         | Fast build tool and development server               |
| **CSS3**         | Custom styles with autism-friendly design principles |
| **ESLint**       | Code linting for quality and consistency             |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/USER1043/SensorySafari.git
   cd animal-learning-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the app in action!

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

---

## 📁 Project Structure

```
animal-learning-app/
├── public/
│   ├── audio/          # Animal sound files (34 unique sounds)
│   ├── images/         # Animal images (34 unique photos)
│   └── vite.svg        # Vite logo
├── src/
│   ├── assets/         # Static assets (logos, icons)
│   ├── components/
│   │   ├── AnimalCard.jsx      # Reusable animal card component
│   │   ├── AnimalCard.css
│   │   ├── AnimalGallery.jsx   # Gallery page with filtering
│   │   ├── AnimalGallery.css
│   │   ├── Confetti.jsx        # Celebration effect component
│   │   ├── Confetti.css
│   │   ├── Home.jsx            # Landing page with navigation
│   │   ├── Home.css
│   │   ├── Layout.jsx          # Main layout wrapper
│   │   ├── Layout.css
│   │   ├── MatchingGame.jsx    # Memory matching game
│   │   ├── MatchingGame.css
│   │   ├── Navigation.jsx      # Main navigation component
│   │   ├── Navigation.css
│   │   ├── Quiz.jsx            # Quiz game component
│   │   └── Quiz.css
│   ├── data/
│   │   └── animals.js          # Animal data (34 animals)
│   ├── App.jsx                 # Main app with routing
│   ├── App.css
│   ├── index.css               # Global styles
│   └── main.jsx                # App entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🐾 Animals Included

### 🐦 Birds (12 species)

Owl, Osprey, Pigeons, Canary, Finch, Lapwing, Yellow-rumped Warbler, Peacock, Seagull, Mockingbird, Amazon Macaw, Vulture

### 🌲 Wild Animals (13 species)

Elephant, Leopard, Squirrel, Fox, Elk, Puma, Gorilla, Chimpanzee, Bison, Tiger, Wolf, Rattlesnake, Alligator, Capuchin Monkey

### 🚜 Farm Animals (3 species)

Donkey, Pony, Turkey

### 🐛 Insects (4 species)

Grasshopper, Cricket, Mosquito, Bee

**Total: 34 unique animals** with images and authentic sounds!

---

## 📱 Responsive Design

The app is fully responsive and works great on:

- 📱 Mobile devices (320px+)
- 📲 Tablets
- 🖥️ Desktop computers

---

## 🎨 Design Philosophy

This app was designed with **autism-friendly principles** in mind:

1. **Calming Colors**: Soft, comfortable color palette that won't overwhelm
2. **Predictable Layout**: Consistent navigation and layout across all pages
3. **Clear Feedback**: Immediate, gentle responses to user actions
4. **No Surprises**: Consistent behavior throughout the app
5. **Focus on Success**: Positive reinforcement and encouragement
6. **Sensory Considerations**: Optional sounds, no flashing animations

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📧 Contact

For questions or suggestions, please open an issue in the repository.

---

<div align="center">

**Made with ❤️ for animal lovers everywhere!**

🦁🐘🦜🐝

</div>
