;(function ($) {

	'use strict';

	// Quantity Button
	var tf_QuantityButton = function () {
		$('.plus').on('click', function () {
			$(this).parents('.quantity').find('input[type="number"]').get(0).stepUp();
		});
		$('.minus').on('click', function () {
			$(this).parents('.quantity').find('input[type="number"]').get(0).stepDown();
		});
	};

	var tf_AddToCart = function () {
		$(document).on('click', '.products li .add_to_cart_button', function (e) {
			var $thisbutton = $(this);
			var $button_text = $thisbutton.html();
			e.preventDefault();
			var product_id = $thisbutton.data('product_id');

			var data = {
				product_id: product_id
			};

			$(document.body).trigger('adding_to_cart', [$thisbutton, data]);

			$.ajax({
				type: 'post',
				url: wc_add_to_cart_params.wc_ajax_url.replace(
					'%%endpoint%%',
					'add_to_cart'
				),
				data: data,
				beforeSend: function (response) {
					$thisbutton.removeClass('added').addClass('loading');
					$thisbutton.html('<i class="fas fa-spinner fa-spin"></i>');
				},
				complete: function (response) {
					$thisbutton.addClass('added').removeClass('loading');
					$thisbutton.html($button_text);
				},
				success: function (response) {
					tf_ToggleMiniCartType('show');

					if (response.error & response.product_url) {
						window.location = response.product_url;
					} else {
						$(document.body).trigger('added_to_cart', [
							response.fragments,
							response.cart_hash
						]);
					}
				}
			});

			return false;
		});
	};

	var tf_ToggleMiniCart = function () {
		$(document).on('click', 'a.nav-cart-trigger', function (e) {
			e.preventDefault();
			tf_ToggleMiniCartType('show');
		});

		$(document).on('click', '.minicart-close, .minicar-overlay', function (e) {
			tf_ToggleMiniCartType('hide');
		});
	};

	function tf_ToggleMiniCartType(toggle_type) {
		var toggle_element = $('.nav-shop-cart, body'),
			toggle_class = 'active-minicart';

		if (toggle_type === 'show') {
			toggle_element.addClass(toggle_class);
		} else if (toggle_type === 'hide') {
			toggle_element.removeClass(toggle_class);
		} else {
			toggle_element.toggleClass('active-minicart');
		}
	}

	var tf_QuickView = function () {
		var qv_modal = $(document).find('#yith-quick-view-modal'),
			qv_overlay = qv_modal.find('.yith-quick-view-overlay'),
			qv_content = qv_modal.find('#yith-quick-view-content'),
			qv_close = qv_modal.find('#yith-quick-view-close'),
			qv_wrapper = qv_modal.find('.yith-wcqv-wrapper'),
			qv_wrapper_w = qv_wrapper.width(),
			qv_wrapper_h = qv_wrapper.height();

		$(document).off('click', '.tf-call-quickview').on('click', '.tf-call-quickview', function (e) {
			e.preventDefault();

			var t = $(this),
				product_id = t.data('product_id'),
				is_blocked = false;

			t.addClass('loading');

			if (typeof yith_qv.loader !== 'undefined') {
				is_blocked = true;
				t.block({
					message: null,
					overlayCSS: {
						background: '#fff url(' + yith_qv.loader + ') no-repeat center',
						opacity: 0.5,
						cursor: 'none'
					}
				});

				if (!qv_modal.hasClass('loading')) {
					qv_modal.addClass('loading');
				}

				// stop loader
				$(document).trigger('qv_loading');
			}
			ajax_call(t, product_id, is_blocked);
		});

		var ajax_call = function (t, product_id, is_blocked) {
			$.ajax({
				url: yith_qv.ajaxurl,
				data: {
					action: 'yith_load_product_quick_view',
					product_id: product_id,
					lang: yith_qv.lang,
					context: 'frontend',
				},
				dataType: 'json',
				type: 'POST',
				success: function (data) {
					qv_content.html(data.html);
					// Variation Form
					var form_variation = qv_content.find('.variations_form');
					form_variation.each(function () {
						$(this).wc_variation_form();
						// add Color and Label Integration
						if (typeof $.fn.yith_wccl !== 'undefined') {
							$(this).yith_wccl();
						} else if (typeof $.yith_wccl != 'undefined' && data.prod_attr) {

							$.yith_wccl(data.prod_attr);
						}
					});
					form_variation.trigger('check_variations');
					form_variation.trigger('reset_image');

					if (!qv_modal.hasClass('open')) {
						qv_modal.removeClass('loading');

					}
				}

			}).done(function () {
				qv_modal.addClass("open");
				t.removeClass('loading');
				tf_QuantityButton();
			});
		};
	};

	var tf_WishListAdd = function () {
		$(document).on('click', '.yith-wcwl-add-to-wishlist:not(.added) .add_to_wishlist', function (ev) {
			var $this = $(this),
				product_id = $this.data('product-id'),
				el_wrap = $this.closest('.yith-wcwl-add-to-wishlist'),
				data = {
					action: yith_wcwl_l10n.actions.add_to_wishlist_action,
					context: 'frontend',
					add_to_wishlist: product_id
				};

			$this.addClass('loading');
			ev.preventDefault();

			$.ajax({
				type: 'POST',
				url: yith_wcwl_l10n.ajax_url,
				data: data,
				dataType: 'json',
				success: function (response) {
					el_wrap.addClass('added');
					$this.removeClass('loading');
				}

			});

			return false;
		});
	};

	var tf_SliderForProductGallery = function () {
		$('.flex-control-thumbs').slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			prevArrow: '<div class="slick-prev" aria-label="Previous"><i class="fal fa-angle-left"></i></div>',
			nextArrow: '<div class="slick-next" aria-label="Next"><i class="fal fa-angle-right"></i></div>',
		});
	};

	var tf_ShowShippingCalculatorCart = function () {
		$('.shipping-calculator-form').show();
	};

	var tf_UnbindClickEdit = function () {
		$(".product-remove .edit").on("click", function () {
			var url = $(this).attr('href');
			window.location = url;
		});
	};


// Dom Ready
	$(function () {
		tf_QuantityButton();
		tf_AddToCart();
		tf_ToggleMiniCart();
		tf_QuickView();
		tf_WishListAdd();
		tf_SliderForProductGallery();
		tf_ShowShippingCalculatorCart();
		tf_UnbindClickEdit();
	});
})(jQuery);