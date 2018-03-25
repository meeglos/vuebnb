<?php

use App\Listing;

Route::get('/', 'ListingController@get_home_web');

Route::get('/listing/{listing}', 'ListingController@get_listing_web');
