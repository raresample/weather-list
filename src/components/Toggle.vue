<template>
  <div class="toggle">
    <input type="checkbox" id="checkbox">
    <label for="checkbox" class="slider"></label>
    <label for="checkbox">{{ units }}</label>
  </div>
</template>

<script>
export default {
setup() {
  
}
}
</script>

<style>
.toggle {
  display: flex;
  align-items: center;
}

.toggle .slider {
  position: relative;
  margin-right: 10px;
  width: 50px;
  height: 30px;
  background: #ddd;
  transition: .4s;
  border-radius: 15px;
  cursor: pointer;
}

.toggle .slider::before {
  position: absolute;
  content: '';
  height: 20px;
  width: 20px;
  top: 5px;
  left: 5px;
  background: white;
  transition: .4s;
  border-radius: 50%;
  box-shadow: 0 0 1px rgba(0,0,0,0.15);
}

input {
  display: none;
}

input:checked + .slider {
  background: blue;
}

input:checked + .slider:before {
  transform: translateX(20px);
}
</style>