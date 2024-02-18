<h1 align="center">
  <a href="https://github.com/CommunityOfCoders/Inheritance-2023">
    <img src="./public/logo-text.png" alt="PromptEase" width="400" height="148">
  </a>
  <br>
  PromptEase
</h1>

<div align="center">
   <strong>PromptEase</strong> - Discover & share AI powered prompts - <br>
</div>
<hr>

<details>
<summary>Table of Contents</summary>

- [Description](#description)
- [Links](#links)
- [Tech Stack](#tech-stack)
- [Progress](#progress)
- [Future Scope](#future-scope)
- [Project Setup](#project-setup)
- [Usage](#usage)


</details>

## 📝Description

PromptEase is an innovative, open-source AI prompting tool designed for the contemporary world, facilitating the discovery, creation, and sharing of creative prompts. With PromptEase, users can effortlessly generate prompts to inspire others, fostering creativity and productivity. The platform offers intuitive options for editing and deleting prompts, ensuring users can refine their content as needed.

## 🔗Links

- [GitHub Repository](https://github.com/vxyzs/PromptEase)
- [Hosted Website Link](https://prompt-ease.vercel.app/)

## 🤖Tech-Stack

#### Front-end

![Next.js](https://img.shields.io/badge/Nextjs-black?style=flat-square&logo=Next.js)
![HTML](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=ffffff)
![CSS](https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3&logoColor=ffffff)
![JavaScript](https://img.shields.io/badge/-Javascript-F7DF1E?style=flat-square&logo=javascript&logoColor=000000)
![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=ffffff)
![Tailwind CSS](https://img.shields.io/badge/-TailwindCSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=ffffff)

#### Database

![MongoDB](https://img.shields.io/badge/MongoDB-47A248.svg?style=flat-square&logo=mongodb&logoColor=ffffff)

## 📈Progress

#### Fully implemented features

👉 **Modern Design with Glassmorphism Trend Style**: A modern and visually appealing design, incorporating the glassmorphism trend style for a sleek and contemporary appearance.

👉 **Discover and Share AI Prompts**: Allow users to discover AI prompts shared by the community and create their own prompts to share with the world.

👉 **Edit and Delete Created Prompts**: Users have the ability to edit their created prompts at any time and delete them when needed.

👉 **Profile Page**: Each user gets a dedicated profile page showcasing all the prompts they've created, providing an overview of their contributions.

👉 **View Other People's Profiles**: Users can explore the profiles of other creators to view the prompts they've shared, fostering a sense of community.

👉 **Copy to Clipboard**: Implement a convenient "Copy to Clipboard" functionality for users to easily copy the AI prompts for their use.

👉 **Search Prompts by Specific Tag**: Allow users to search for prompts based on specific tags, making it easier to find prompts related to specific topics.

👉 **Google Authentication using NextAuth**: Enable secure Google authentication using NextAuth, ensuring a streamlined and trustworthy login experience.

👉 **Responsive Website**: Develop a fully responsive website to ensure optimal user experience across various devices, from desktops to smartphones

and many more, including code architecture and reusability 

## 🔮Future Scope

- [ ] Providing github authorization using NextAuth
- [ ] Addition of liking the prompt, feature.

## 💸Applications

1. Users can efficiently plan their trips by filling out a form for their desired city destination, accessing comprehensive information on hotels, restaurants, attractions, flights, and local events in one centralized platform.
2. Users can customize their trip itinerary by adding preferred hotels, restaurants, and attractions to their plan, tailoring their travel experience to their specific interests and preferences.
3. Trip Planner allows users to easily update their trip plans as needed, ensuring flexibility and adaptability throughout their journey.
4. We can display targeted advertisements within our application, by partnering with travel-related businesses, such as hotels, airlines, and restaurants, to promote their services to users based on their travel preferences and itinerary.
5. Overall, the Trip Planner project aims to revolutionize the way individuals plan and experience their travels, offering convenience, customization, and seamless integration of travel-related services in one comprehensive platform.

## 🛠Project Setup

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/vxyzs/PromptEase.git
cd PromptEase
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000
NEXTAUTH_SECRET=
GOOGLE_ID=
GOOGLE_CLIENT_SECRET=
MONGODB_URI=
```

Replace the placeholder values with your actual credentials. You can obtain these credentials by signing up on these corresponding websites from [Google Cloud Console](https://console.cloud.google.com/welcome?rapt=AEjHL4MBaLLneW6OfAHf_zgms1eWZFw1wdy0_KIC4uh1nEqh2m4ojOvrXNlzJ4h7CZTkpiWgcsoHbUvS-FMdCP7WIkaVlPAeU7cnVR6Y0wJHeLMOtU6KAzA&project=promptopia-385410), [Cryptpool](https://www.cryptool.org/en/cto/openssl) (for random Auth Secret), and [MongoDB](https://www.mongodb.com/). 

**Running the Project**

```bash
npm run dev
```


## 💻Usage

1. User needs to sign up using google mail account.
2. After that user can create its own prompt or search prompts by username or tag or any word in prompt.
3. User can visit others profile and view their uploaded prompts.
4. Can Edit or Delete prompts whenever needed. 

