<?php

// namespace App\Http\Controllers;

// use Illuminate\Http\Request;

// class BookController extends Controller
// {
//     /**
//      * Display a listing of the resource.
//      */
//     public function index()
//     {
//         //
//     }

//     /**
//      * Store a newly created resource in storage.
//      */
//     public function store(Request $request)
//     {
//         $request->validate([
//             'name' => 'required|string',
//             'author' => 'required|string',
//             'isbn' => 'required|string|unique:books,isbn',
//     }

//     /**
//      * Display the specified resource.
//      */
//     public function show(string $id)
//     {
//         //
//     }

//     /**
//      * Update the specified resource in storage.
//      */
//     public function update(Request $request, string $id)
//     {
//         //
//     }

//     /**
//      * Remove the specified resource from storage.
//      */
//     public function destroy(string $id)
//     {
//         //
//     }
// }
namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index()
    {
        return response()->json(Book::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'author' => 'required|string',
            'isbn' => 'required|string|unique:books,isbn',
        ]);

        $book = Book::create($request->all());
        return response()->json($book, 201);
    }
}
