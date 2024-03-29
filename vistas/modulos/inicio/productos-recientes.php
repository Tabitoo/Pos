<?php

$limit = 5;

$productos = ControladorProductos::getProductsByLimit($limit);

 ?>


<div class="box box-primary">

  <div class="box-header with-border">

    <h3 class="box-title">Productos Agregados recientemente</h3>

    <div class="box-tools pull-right">

      <button type="button" class="btn btn-box-tool" data-widget="collapse">

        <i class="fa fa-minus"></i>

      </button>

      <button type="button" class="btn btn-box-tool" data-widget="remove">

        <i class="fa fa-times"></i>

      </button>

    </div>

  </div>
  
  <div class="box-body">

    <ul class="products-list product-list-in-box">

    <?php

    foreach ($productos as $key => $producto) {
      
      echo '<li class="item">

        <div class="product-img">

          <img src="'.$producto["imagen"].'" alt="Product Image">

        </div>

        <div class="product-info">

          <a href="" class="product-title">

            '.$producto["descripcion"].'

            <span class="label label-warning pull-right">$'.$producto["precio_venta"].'</span>

          </a>
    
       </div>

      </li>';

    }

    ?>

    </ul>

  </div>

  <div class="box-footer text-center">

    <a href="productos" class="uppercase">Ver todos los productos</a>
  
  </div>

</div>
