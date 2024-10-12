<?php
// add style and script in build folder
function add_style_and_script() {
    $theme_version = wp_get_theme()->get('Version');
    wp_enqueue_style('mosne-dots-styles', get_template_directory_uri() . '/build/index.css', array(), $theme_version);
    wp_enqueue_script('mosne-dots-scripts', get_template_directory_uri() . '/build/index.js', array(), $theme_version, true);
}
add_action('wp_enqueue_scripts', 'add_style_and_script');
