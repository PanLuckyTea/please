import '../style.css';
import { supabase } from '../supabase.js';

const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('login-email');
const passwordInput = document.getElementById('login-password');
const errorMessage = document.getElementById('error-message');

console.log("Status inicjalizacji Supabase w logowaniu:", supabase);

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorMessage.classList.add('hidden');
  errorMessage.textContent = '';

  console.log("Formularz wysłany! Próba pobrania danych z pól...");

  try {
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;
    
    console.log("Dane pobrane. Email:", emailValue, "Rozpoczęcie komunikacji z Supabase...");

    if (!supabase || !supabase.auth) {
      throw new Error("Obiekt 'supabase' lub 'supabase.auth' nie istnieje! Problem z plikiem supabase.js");
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailValue,
      password: passwordValue,
    });

    console.log("Otrzymano odpowiedź z Supabase. Error?:", error, "Data?:", data);

    if (error) {
      errorMessage.textContent = `Błąd z bazy Supabase: ${error.message}`;
      errorMessage.classList.remove('hidden');
    } else {
      console.log("Zalogowano pomyślnie! Przekierowanie...");
      window.location.href = '../index.html'; 
    }

  } catch (catchError) {
    console.error("KRYTYCZNY BŁĄD SKRYPTU:", catchError);
    errorMessage.textContent = `Błąd aplikacji: ${catchError.message}`;
    errorMessage.classList.remove('hidden');
  }
});