<template>
  <div class="signup-container">
    <h1>User Registration</h1>
    <div class="signup-form">
      <div class="form-group">
        <label for="name">Full Name</label>
        <input
          id="name"
          type="text"
          v-model="formData.name"
          placeholder="Enter your full name"
          @blur="validateField('name')"
          :class="{ 'error-input': errors.name }"
        />
        <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
      </div>
      <div class="form-group">
        <label for="email">Email Address</label>
        <input
          id="email"
          type="email"
          v-model="formData.email"
          placeholder="Enter your email address"
          @blur="validateField('email')"
          :class="{ 'error-input': errors.email }"
        />
        <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          v-model="formData.password"
          placeholder="Create a password (min 6 characters)"
          @blur="validateField('password')"
          :class="{ 'error-input': errors.password }"
        />
        <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
      </div>
      <div class="form-group">
        <label for="mobile">Mobile Number</label>
        <input
          id="mobile"
          type="tel"
          v-model="formData.mobile"
          placeholder="Enter 10-digit mobile number"
          @blur="validateField('mobile')"
          :class="{ 'error-input': errors.mobile }"
        />
        <span v-if="errors.mobile" class="error-message">{{ errors.mobile }}</span>
      </div>
      <button
        @click="handleSubmit"
        :disabled="isLoading"
        class="submit-btn"
      >
        {{ isLoading ? 'Creating Account...' : 'Create Account' }}
      </button>
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
    </div>
  </div>
  <router-link to="/login">login</router-link>
</template>
<script>
import axios from 'axios';

export default {
  name: 'SignUp',
  data() {
    return {
      formData: {
        name: '',
        email: '',
        password: '',
        mobile: ''
      },
      errors: {
        name: '',
        email: '',
        password: '',
        mobile: ''
      },
      isLoading: false,
      successMessage: ''
    };
  },
  methods: {
    validateField(field) {
      this.errors[field] = '';

      switch (field) {
        case 'name':
          if (this.formData.name.trim() === '') {
            this.errors.name = 'Full name is required.';
          }
          break;

        case 'email': {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!this.formData.email) {
            this.errors.email = 'Email address is required.';
          } else if (!emailRegex.test(this.formData.email)) {
            this.errors.email = 'Please enter a valid email address.';
          }
          break;
        }

        case 'password':
          if (!this.formData.password) {
            this.errors.password = 'Password is required.';
          } else if (this.formData.password.length < 6) {
            this.errors.password = 'Password must be at least 6 characters long.';
          }
          break;

        case 'mobile': {
          const mobileRegex = /^\d{10}$/;
          if (!this.formData.mobile) {
            this.errors.mobile = 'Mobile number is required.';
          } else if (!mobileRegex.test(this.formData.mobile)) {
            this.errors.mobile = 'Please enter a valid 10-digit mobile number.';
          }
          break;
        }
      }
    },
    validateForm() {
      this.validateField('name');
      this.validateField('email');
      this.validateField('password');
      this.validateField('mobile');
      return !Object.values(this.errors).some(error => error !== '');
    },


    async handleSubmit() {
      this.successMessage = '';
      if (!this.validateForm()) {
        return;
      }
      this.isLoading = true;

      try {
        const response = await axios.post('http://localhost:3000/users', {
          name: this.formData.name.trim(),
          email: this.formData.email.toLowerCase().trim(),
          password: this.formData.password,
          mobile: this.formData.mobile
        });
        this.successMessage = 'Account created successfully! Welcome aboard!';
        console.log('Registration successful:', response.data);
        this.resetForm();

      } catch (error) {
        console.error('Registration failed:', error);
        if (error.response) {
          this.errors.general = error.response.data.message || 'Registration failed. Please try again.';
        } else if (error.request) {
          this.errors.general = 'Network error. Please check your connection and try again.';
        } else {
          this.errors.general = 'An unexpected error occurred. Please try again.';
        }
      } finally {
        this.isLoading = false;
      }
    },
    resetForm() {
      this.formData = {
        name: '',
        email: '',
        password: '',
        mobile: ''
      };
      this.errors = {
        name: '',
        email: '',
        password: '',
        mobile: ''
      };
    }
  }
};
</script>

<style scoped>
.signup-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 2em;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input {
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #42b983;
}

input.error-input {
  border-color: #e74c3c;
}

.error-message {
  color: #e74c3c;
  font-size: 14px;
  margin-top: 5px;
  display: block;
}

.submit-btn {
  width: 100%;
  padding: 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  background-color: #369870;
}

.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.success-message {
  margin-top: 20px;
  padding: 15px;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 5px;
  text-align: center;
}
</style>