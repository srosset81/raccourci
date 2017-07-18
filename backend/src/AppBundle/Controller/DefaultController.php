<?php

namespace AppBundle\Controller;

use AppBundle\Entity\ShortUrl;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="create_url")
     * @Method({"POST","OPTIONS"})
     */
    public function createAction(Request $request)
    {
        $content = $request->getContent();

        if (!empty($content)) {
            $params = json_decode($content, true);

            if (isset($params['url']) && filter_var($params['url'], FILTER_VALIDATE_URL)) {

                $em = $this->getDoctrine()->getManager();

                do {
                    $id = uniqid();
                    $shortUrl = $this->getDoctrine()->getRepository('AppBundle:ShortUrl')->find($id);
                } while (isset($shortUrl));

                $shortUrl = new ShortUrl();
                $shortUrl->setId($id);
                $shortUrl->setUrl($params['url']);

                $em->persist($shortUrl);
                $em->flush();

                return new Response($id, Response::HTTP_OK);
            }
        }

        return new Response('error', Response::HTTP_OK);
    }

    /**
     * @Route("/{id}", name="get_url")
     */
    public function getAction($id)
    {
        /** @var ShortUrl $shortUrl */
        $shortUrl = $this->getDoctrine()->getRepository('AppBundle:ShortUrl')->find($id);

        if( isset($shortUrl) ) {
            return new RedirectResponse( $shortUrl->getUrl() );
        } else {
            return new Response("Aucun URL n'existe avec cet ID" );
        }
    }
}
