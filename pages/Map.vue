<template>
  <div class="map">
    <h1>
      Вы можете найти нас по адресу: Новомосковск, Тульская обл., Комсомольская
      ул., 7
    </h1>
    <map>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3315.7313880156476!2d38.27866211497088!3d54.01029853462468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x41369d4df2b78623%3A0x3dff32ee92a329ab!2z0K3Qu9C10LrRgtGA0LjQutCwIOKEljE!5e0!3m2!1sru!2sru!4v1646388820392!5m2!1sru!2sru"
        width="90%"
        height="450"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
      ></iframe>
    </map>
  </div>
</template>

<script>
export default {};
</script>

<style>
h1 {
  padding-top: 70px;
  text-align: center;
}
iframe {
  display: block;
  margin: 50px auto;
}
@media (max-width: 768px) {
  h1 {
    font-size: 24px;
  }
}
</style>
