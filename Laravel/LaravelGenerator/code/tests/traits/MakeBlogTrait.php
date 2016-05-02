<?php

use Faker\Factory as Faker;
use App\Models\Blog;
use App\Repositories\BlogRepository;

trait MakeBlogTrait
{
    /**
     * Create fake instance of Blog and save it in database
     *
     * @param array $blogFields
     * @return Blog
     */
    public function makeBlog($blogFields = [])
    {
        /** @var BlogRepository $blogRepo */
        $blogRepo = App::make(BlogRepository::class);
        $theme = $this->fakeBlogData($blogFields);
        return $blogRepo->create($theme);
    }

    /**
     * Get fake instance of Blog
     *
     * @param array $blogFields
     * @return Blog
     */
    public function fakeBlog($blogFields = [])
    {
        return new Blog($this->fakeBlogData($blogFields));
    }

    /**
     * Get fake data of Blog
     *
     * @param array $postFields
     * @return array
     */
    public function fakeBlogData($blogFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'title' => $fake->text,
            'body' => $fake->text,
            'created_at' => $fake->word,
            'updated_at' => $fake->word
        ], $blogFields);
    }
}
