<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateBlogAPIRequest;
use App\Http\Requests\API\UpdateBlogAPIRequest;
use App\Models\Blog;
use App\Repositories\BlogRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use InfyOm\Generator\Utils\ResponseUtil;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class BlogController
 * @package App\Http\Controllers\API
 */

class BlogAPIController extends AppBaseController
{
    /** @var  BlogRepository */
    private $blogRepository;

    public function __construct(BlogRepository $blogRepo)
    {
        $this->blogRepository = $blogRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/blogs",
     *      summary="Get a listing of the Blogs.",
     *      tags={"Blog"},
     *      description="Get all Blogs",
     *      produces={"application/json"},
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  type="array",
     *                  @SWG\Items(ref="#/definitions/Blog")
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function index(Request $request)
    {
        $this->blogRepository->pushCriteria(new RequestCriteria($request));
        $this->blogRepository->pushCriteria(new LimitOffsetCriteria($request));
        $blogs = $this->blogRepository->all();

        return $this->sendResponse($blogs->toArray(), 'Blogs retrieved successfully');
    }

    /**
     * @param CreateBlogAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/blogs",
     *      summary="Store a newly created Blog in storage",
     *      tags={"Blog"},
     *      description="Store Blog",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Blog that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Blog")
     *      ),
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  ref="#/definitions/Blog"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateBlogAPIRequest $request)
    {
        $input = $request->all();

        $blogs = $this->blogRepository->create($input);

        return $this->sendResponse($blogs->toArray(), 'Blog saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/blogs/{id}",
     *      summary="Display the specified Blog",
     *      tags={"Blog"},
     *      description="Get Blog",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Blog",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  ref="#/definitions/Blog"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function show($id)
    {
        /** @var Blog $blog */
        $blog = $this->blogRepository->find($id);

        if (empty($blog)) {
            return Response::json(ResponseUtil::makeError('Blog not found'), 400);
        }

        return $this->sendResponse($blog->toArray(), 'Blog retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateBlogAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/blogs/{id}",
     *      summary="Update the specified Blog in storage",
     *      tags={"Blog"},
     *      description="Update Blog",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Blog",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Blog that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Blog")
     *      ),
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  ref="#/definitions/Blog"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateBlogAPIRequest $request)
    {
        $input = $request->all();

        /** @var Blog $blog */
        $blog = $this->blogRepository->find($id);

        if (empty($blog)) {
            return Response::json(ResponseUtil::makeError('Blog not found'), 400);
        }

        $blog = $this->blogRepository->update($input, $id);

        return $this->sendResponse($blog->toArray(), 'Blog updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/blogs/{id}",
     *      summary="Remove the specified Blog from storage",
     *      tags={"Blog"},
     *      description="Delete Blog",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Blog",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  type="string"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function destroy($id)
    {
        /** @var Blog $blog */
        $blog = $this->blogRepository->find($id);

        if (empty($blog)) {
            return Response::json(ResponseUtil::makeError('Blog not found'), 400);
        }

        $blog->delete();

        return $this->sendResponse($id, 'Blog deleted successfully');
    }
}
