
<script>

console.log('ServiceWorker:', navigator.serviceWorker);

navigator.serviceWorker?.getRegistrations().then(registrations => {
    for (const registration of registrations) {
        console.log('ServiceWorker unregistered:', registration);
        registration.unregister();
    } 
});

</script>

<template>



</template>