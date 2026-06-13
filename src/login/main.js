import '../style.css';
import { supabase } from '../supabase.js';

const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('login-email');
const passwordInput = document.getElementById('login-password');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorMessage.classList.add('hidden');

  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: emailValue,
    password: passwordValue,
  });

  if (error) {
    errorMessage.textContent = 'Błąd uwierzytelniania. Sprawdź wprowadzone dane.';
    errorMessage.classList.remove('hidden');
    console.error('Supabase auth error:', error.message);
  } else {
    window.location.href = '../index.html'; 
  }
});