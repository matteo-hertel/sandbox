<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class BlogApiTest extends TestCase
{
    use MakeBlogTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateBlog()
    {
        $blog = $this->fakeBlogData();
        $this->json('POST', '/api/v1/blogs', $blog);

        $this->assertApiResponse($blog);
    }

    /**
     * @test
     */
    public function testReadBlog()
    {
        $blog = $this->makeBlog();
        $this->json('GET', '/api/v1/blogs/'.$blog->id);

        $this->assertApiResponse($blog->toArray());
    }

    /**
     * @test
     */
    public function testUpdateBlog()
    {
        $blog = $this->makeBlog();
        $editedBlog = $this->fakeBlogData();

        $this->json('PUT', '/api/v1/blogs/'.$blog->id, $editedBlog);

        $this->assertApiResponse($editedBlog);
    }

    /**
     * @test
     */
    public function testDeleteBlog()
    {
        $blog = $this->makeBlog();
        $this->json('DELETE', '/api/v1/blogs/'.$blog->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/blogs/'.$blog->id);

        $this->assertResponseStatus(404);
    }
}
