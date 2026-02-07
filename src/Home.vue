<template>
    <div class="home-container">
        <h1>Welcome to Our App</h1>
        <p>Please choose an option below:</p>
        <div class="home-options">
            <router-link to="/login" class="home-link login-link">Login</router-link>
            <router-link to="/signup" class="home-link signup-link">Sign Up</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomePage'
}
</script>

<style scoped>
.home-container {
    text-align: center;
    padding: 50px 20px;
}

.home-container h1 {
    color: #42b983;
    margin-bottom: 20px;
}

.home-options {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 30px;
}

.home-link {
    display: inline-block;
    padding: 15px 30px;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
    transition: background-color 0.3s ease;
}

.login-link {
    background-color: #007bff;
    color: white;
}

.login-link:hover {
    background-color: #0056b3;
}

.signup-link {
    background-color: #28a745;
    color: white;
}

.signup-link:hover {
    background-color: #1e7e34;
}
</style>