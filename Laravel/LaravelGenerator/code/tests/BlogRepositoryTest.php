<?php

use App\Models\Blog;
use App\Repositories\BlogRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class BlogRepositoryTest extends TestCase
{
    use MakeBlogTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var BlogRepository
     */
    protected $blogRepo;

    public function setUp()
    {
        parent::setUp();
        $this->blogRepo = App::make(BlogRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateBlog()
    {
        $blog = $this->fakeBlogData();
        $createdBlog = $this->blogRepo->create($blog);
        $createdBlog = $createdBlog->toArray();
        $this->assertArrayHasKey('id', $createdBlog);
        $this->assertNotNull($createdBlog['id'], 'Created Blog must have id specified');
        $this->assertNotNull(Blog::find($createdBlog['id']), 'Blog with given id must be in DB');
        $this->assertModelData($blog, $createdBlog);
    }

    /**
     * @test read
     */
    public function testReadBlog()
    {
        $blog = $this->makeBlog();
        $dbBlog = $this->blogRepo->find($blog->id);
        $dbBlog = $dbBlog->toArray();
        $this->assertModelData($blog->toArray(), $dbBlog);
    }

    /**
     * @test update
     */
    public function testUpdateBlog()
    {
        $blog = $this->makeBlog();
        $fakeBlog = $this->fakeBlogData();
        $updatedBlog = $this->blogRepo->update($fakeBlog, $blog->id);
        $this->assertModelData($fakeBlog, $updatedBlog->toArray());
        $dbBlog = $this->blogRepo->find($blog->id);
        $this->assertModelData($fakeBlog, $dbBlog->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteBlog()
    {
        $blog = $this->makeBlog();
        $resp = $this->blogRepo->delete($blog->id);
        $this->assertTrue($resp);
        $this->assertNull(Blog::find($blog->id), 'Blog should not exist in DB');
    }
}
