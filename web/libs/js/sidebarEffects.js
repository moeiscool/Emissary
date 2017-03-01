/**
 * sidebarEffects.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */



$('body').on('click','#st-trigger-effects button',function(ev){
    $('.st-container').toggleClass('st-menu-open')
})