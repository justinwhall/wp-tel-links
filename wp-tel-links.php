<?php
/*
 * Plugin Name: WP Tel Links
 * Version: 1.0
 * Plugin URI: http://www.justinwhall.com/
 * Description: Finds all telephone numbers and replaces them with click-2-call tel links
 * Author: Justin W Hall
 * Author URI: http://www.justinwhall.com/
 * Requires at least: 4.0
 * Tested up to: 4.0
 *
 * Text Domain: wp-tel-links
 * Domain Path: /lang/
 *
 * @package WordPress
 * @author Justin Hall
 * @since 1.0.0
 */
if ( ! defined( 'ABSPATH' ) ) exit;

function wp_tel_links_include_script() {
    wp_enqueue_script( 'newscript', plugins_url( '/wp-tel-links.js' , __FILE__ ), array( 'jquery' ) );
}
add_action( 'wp_enqueue_scripts', 'wp_tel_links_include_script' );
