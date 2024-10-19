<?php
/**
 * Title: Call to action
 * Slug: mosne-dots/call-to-action
 * Categories: call-to-action
 * Keywords: image, button, contact
 * Description: A section ideal for encouraging users to take action and featuring a duotone image.
 * Viewport width: 1200
 */

$image = get_template_directory_uri() . '/assets/images/cat.webp';
?>
<!-- wp:columns {"verticalAlignment":"top","align":"wide","style":{"spacing":{"blockGap":{"top":"var:preset|spacing|50","left":"var:preset|spacing|70"},"margin":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|60"}}}} -->
<div class="wp-block-columns alignwide are-vertically-aligned-top" style="margin-top:var(--wp--preset--spacing--60);margin-bottom:var(--wp--preset--spacing--60)"><!-- wp:column {"verticalAlignment":"top"} -->
	<div class="wp-block-column is-vertically-aligned-top"><!-- wp:heading -->
		<h2 class="wp-block-heading">Call to action</h2>
		<!-- /wp:heading -->

		<!-- wp:paragraph -->
		<p>Quisque malesuada placerat nisl. Praesent ut ligula non mi varius sagittis. Donec id justo. In ac felis quis tortor malesuada pretium. Fusce fermentum odio nec arcu.</p>
		<!-- /wp:paragraph -->

		<!-- wp:buttons {"style":{"spacing":{"margin":{"top":"var:preset|spacing|40"}}}} -->
		<div class="wp-block-buttons" style="margin-top:var(--wp--preset--spacing--40)"><!-- wp:button -->
			<div class="wp-block-button"><a class="wp-block-button__link wp-element-button">Duotone images</a></div>
			<!-- /wp:button -->

			<!-- wp:button {"className":"is-style-outline"} -->
			<div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button">Contact</a></div>
			<!-- /wp:button --></div>
		<!-- /wp:buttons --></div>
	<!-- /wp:column -->

	<!-- wp:column {"verticalAlignment":"top"} -->
	<div class="wp-block-column is-vertically-aligned-top"><!-- wp:image {"id":2182,"sizeSlug":"large","style":{"border":{"radius":"48px"},"color":{"duotone":"var:preset|duotone|duotone-1"}}} -->
		<figure class="wp-block-image size-large has-custom-border"><img src="<?php echo esc_url($image);?>" alt="A white and grey cat with green eyes peering through green leaves of a houseplant.by Mosne / Paolo Tesei/ CC0 1.0" class="wp-image-2182" style="border-radius:48px"/></figure>
		<!-- /wp:image --></div>
	<!-- /wp:column --></div>
<!-- /wp:columns -->
