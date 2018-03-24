<?php

use App\Listing;

Route::get('/listing/{listing}', 'ListingController@get_listing_web');
