<?php

namespace Laratube\Http\Controllers;

use Illuminate\Http\Request;
use Laratube\Channel;
use Laratube\Jobs\Videos\ConvertForStreaming;

class UploadVideoController extends Controller
{
    public function index(Channel $channel)
    {
        return view('channels.upload', [
            'channel' => $channel
        ]);
    }

    public function store(Channel $channel) {
        $video = $channel->videos()->create([
            'title' => request()->title,
            'path' => request()->video->store("channels/{$channel->id}")
        ]);

        dump($this->dispatch(new ConvertForStreaming($video)));

        return $video;
    }
}
