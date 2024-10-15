<?php
// add style and script in build folder
function add_style_and_script() {
    $theme_version = wp_get_theme()->get('Version');
    wp_enqueue_style('mosne-dots-styles', get_template_directory_uri() . '/build/index.css', array(), $theme_version);
    wp_enqueue_script('mosne-dots-scripts', get_template_directory_uri() . '/build/index.js', array(), $theme_version, true);
}
add_action('wp_enqueue_scripts', 'add_style_and_script');

// Add big dots as block style for the spacer block
if ( function_exists( 'register_block_style' ) ) {
    register_block_style(
        'core/spacer',
        array(
            'name'         => 'big-dot',
            'label'        => __( 'Big Dot', 'mosne-dots' ),
            'is_default'   => false,
            'inline_style' => '.wp-block-spacer.is-style-big-dot { 
                position: relative;
                // make it the spacer always squared
                width: 100%;
                height: 100%;
                aspect-ratio: 1 / 1;
                }
                .wp-block-spacer.is-style-big-dot:after {
                    content: "";
                    display: block;
                    clear: both;
                    width: auto;
                    height: 100%;
                    aspect-ratio: 1 / 1;
                    background-color: currentColor;
                    border-radius: 100%;
                    left: 0;
                    top: 0;
                    position: absolute;
                }
            }',
        )
    );
}

// Add a new category for the block patterns
register_block_pattern_category(
	'mosne-dots',
	array( 'label' => __( 'Mosne Dots', 'mosne-dots' ) )
);
