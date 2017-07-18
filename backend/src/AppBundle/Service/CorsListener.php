<?php
namespace AppBundle\Service;

use Symfony\Component\HttpKernel\Event\FilterResponseEvent;

/*
 * Adds CORS headers to all responses
 */
class CorsListener
{
    public function onKernelResponse(FilterResponseEvent $event)
    {
        $responseHeaders = $event->getResponse()->headers;

        $responseHeaders->set('Access-Control-Allow-Headers', 'origin, content-type, authorization, accept');
        $responseHeaders->set('Access-Control-Allow-Origin', '*' );
        $responseHeaders->set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, PATCH, OPTIONS');
        $responseHeaders->set('Access-Control-Allow-Credentials', 'true'); 
    } 
}