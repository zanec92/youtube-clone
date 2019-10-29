<?php

namespace Laratube\Http\Controllers;

use Illuminate\Http\Request;
use Laratube\Comment;
use Laratube\Video;

class CommentController extends Controller
{
    public function index(Video $video)
    {
        return $video->comments()->paginate(10);
    }

    public function show(Comment $comment)
    {
        return $comment->replies()->paginate(10);
    }
}
