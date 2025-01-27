"use client";

import { useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  contact?: string;
  profilePicture?: string | null; // Optional field for profile picture
}

const sanitizeInput = (input: any): string => {
  const inputFilteredTrim = input.trim();
  return inputFilteredTrim
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\\/g, "");
};

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contact, setContact] = useState("");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState("");
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);

  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicture(reader.result as string); // Convert to Base64
    };
    reader.readAsDataURL(file);
  };

  const handleRecaptchaVerify = () => {
    // Simulate ReCAPTCHA verification (Replace with real integration)
    setRecaptchaVerified(true);
    alert("ReCAPTCHA verified successfully!");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGeneralError("");

    if (!recaptchaVerified) {
      setGeneralError("Please complete the ReCAPTCHA verification.");
      return;
    }

    if (password !== confirmPassword) {
      setGeneralError("Passwords do not match!");
      return;
    }

    const userData: UserData = {
      firstName: sanitizeInput(firstName),
      lastName: sanitizeInput(lastName),
      email: sanitizeInput(email),
      password,
      contact: sanitizeInput(contact),
      profilePicture,
    };

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (!response.ok) {
        setGeneralError(data.message || "Registration failed.");
        return;
      }

      alert("Registration successful! Redirecting to login page...");
      setTimeout(() => {
        window.location.href = "/Login"; // Redirect to login page
      }, 2000);
    } catch (error) {
      console.error("Registration error:", error);
      setGeneralError("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="screenMiddleDiv">
      <div className="formDiv">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-center text-2xl font-bold">Create Account</h2>

          {generalError && (
            <p className="text-red-500 text-xs text-center">{generalError}</p>
          )}

          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="formLabel">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="formLabel">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="formLabel">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="formLabel">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* Password Strength Meter */}
            <PasswordStrengthBar password={password} />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="formLabel">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Contact */}
          <div>
            <label htmlFor="contact" className="formLabel">Contact (Optional)</label>
            <input
              type="text"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

          {/* Profile Picture */}
          <div>
            <label htmlFor="profilePicture" className="formLabel">Profile Picture</label>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={handleProfilePictureUpload}
            />
            {profilePicture && (
              <img
                src={profilePicture}
                alt="Profile Preview"
                className="mt-2 w-24 h-24 rounded-full object-cover"
              />
            )}
          </div>

          {/* ReCAPTCHA */}
          <div>
            <button
              type="button"
              onClick={handleRecaptchaVerify}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Verify ReCAPTCHA
            </button>
          </div>

          <button type="submit" className="formButton">Register</button>
        </form>

        {/* Already have an account */}
        <div className="text-center mt-4">
          <p className="text-sm">
            Already have an account?{" "}
            <a
              href="/Login" // Update this to your login page route
              className="text-blue-500 hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
