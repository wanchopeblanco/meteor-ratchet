##Indesign Ratchet

###Install
```shell
meteor add indesign:ratchet
````

###Using Ratchet
You can read the full documentation about ratchet at [goRatchet.com](www.goRatchet.com)

We have removed push.js so it wont interfere with your routes, but you wont get animations when opening new links.

####Create a layout
```html
<template name="layout">
    <header class="bar bar-nav">
		<a class="icon icon-search pull-right"></a>
		<a href="#" class="icon icon-plus pull-right"></a>

		<h1 class="title white">
		    <!-- Can show text or an image -->
			<img src="/images/logo_h_contrast.png" style="max-height:22px; margin-top: -7px">
		</h1>
	</header>
	
	<!-- Render the content with your router, we use FlowRouter but it would work with iron-router, use {{yield}} -->
	{{> Template.dynamic template=content}}
	
	<!-- Tab bar is optional, just for showing how to setup -->
	<nav class="bar bar-tab">
		<a class="tab-item" href="#">
			<span class="icon icon-home"></span>
			<span class="tab-label">Inicio</span>
		</a>
		<a class="tab-item" href="#">
			<span class="icon icon-star"></span>
			<span class="tab-label">Favoritos</span>
		</a>
		<a class="tab-item" href="#">
			<span class="icon icon-edit"></span>
			<span class="tab-label">Editar</span>
		</a>
		<a class="tab-item" href="#">
			<span class="icon icon-search"></span>
			<span class="tab-label">Buscar</span>
		</a>
		<a class="tab-item" href="#">
			<span class="icon icon-person"></span>
			<span class="tab-label">Perfil</span>
		</a>
	</nav>
</template>
```

####Create a page
Create a page and render it with your favorite Router

```html
<template name="page">
    <div class="content">
        <!-- Use margin-bottom:50px only when you are using tabbar -->
		<div class="content-padded" style="margin-bottom: 50px">
		    Put what ever content you like in here
		</div>
	</div>
</template>
```
