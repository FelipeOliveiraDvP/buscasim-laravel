<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Customer;
use App\Models\Indication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CustomersController extends Controller
{
  public function index(Request $request)
  {
    $query = Customer::query();

    if ($request->has('name')) {
      $query->where('name', 'like', "%{$request->name}%");
    }

    if ($request->has('document')) {
      $query->where('document', 'like', "%{$request->email}%");
    }

    $query->with('address')->with('indication');

    return response()->json($query->paginate(30), 200);
  }

  public function store(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'name'              => 'required|string',
      'document'          => 'required|cpf',
      'email'             => 'required|string|email',
      'phone'             => 'required|celular_com_ddd',
      'birth_date'        => 'required|date',
      'address.zip'       => 'required|size:8',
      'address.street'    => 'required|string',
      'address.number'    => 'required|string',
      'address.city'      => 'required|string',
      'address.state'     => 'required|string|size:2|uppercase',
      'is_indication'     => 'boolean',
      'indication.name'   => 'required_if:is_indication,true',
      'indication.email'  => 'required_if:is_indication,true',
      'indication.phone'  => 'required_if:is_indication,true',
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 400);
    }

    if ($request->is_indication) {
      $indication = Indication::create([
        'name'  => $request->input('indication.name'),
        'email' => $request->input('indication.email'),
        'phone' => $request->input('indication.phone'),
      ]);
    }

    $address = Address::create([
      'zip'         => $request->input('address.zip'),
      'street'      => $request->input('address.street'),
      'number'      => $request->input('address.number'),
      'city'        => $request->input('address.city'),
      'state'       => $request->input('address.state'),
      'complement'  => $request->input('address.complement'),
    ]);

    Customer::create([
      'name'          => $request->name,
      'document'      => $request->document,
      'email'         => $request->email,
      'phone'         => $request->phone,
      'birth_date'    => $request->birth_date,
      'address_id'    => $address->id,
      'indication_id' => $request->is_indication ? $indication->id : null,
    ]);

    return response()->json(['message' => 'Cliente cadastrado com sucesso'], 201);
  }

  public function update(Request $request, string $id)
  {
    $customer = Customer::where('id', '=', $id)->first();

    if (!$customer) {
      return response()->json([
        'message' => 'Cliente não encontrado'
      ], 404);
    }

    $validator = Validator::make($request->all(), [
      'name'              => 'required|string',
      'document'          => 'required|cpf',
      'email'             => 'required|string|email',
      'phone'             => 'required|celular_com_ddd',
      'birth_date'        => 'required|date',
      'address.zip'       => 'required|size:8',
      'address.street'    => 'required|string',
      'address.number'    => 'required|string',
      'address.city'      => 'required|string',
      'address.state'     => 'required|string|size:2|uppercase',
      'is_indication'     => 'boolean',
      'indication.name'   => 'required_if:is_indication,true',
      'indication.email'  => 'required_if:is_indication,true',
      'indication.phone'  => 'required_if:is_indication,true',
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 400);
    }

    if ($request->is_indication == false) {
      $customer->indication_id = null;
      $customer->save();
    } else {
      if ($customer->indication) {
        $customer->indication->name  = $request->input('indication.name');
        $customer->indication->email = $request->input('indication.email');
        $customer->indication->phone = $request->input('indication.phone');
        $customer->indication->save();
      } else {
        $indication = Indication::create([
          'name'  => $request->input('indication.name'),
          'email' => $request->input('indication.email'),
          'phone' => $request->input('indication.phone'),
        ]);
      }
    }

    $customer->address->zip         = $request->input('address.zip');
    $customer->address->street      = $request->input('address.street');
    $customer->address->number      = $request->input('address.number');
    $customer->address->city        = $request->input('address.city');
    $customer->address->state       = $request->input('address.state');
    $customer->address->complement  = $request->input('address.complement');
    $customer->address->save();

    $is_new_indication = $request->is_indication == true && $customer->indication_id == null;

    $customer->name           = $request->name;
    $customer->document       = $request->document;
    $customer->email          = $request->email;
    $customer->phone          = $request->phone;
    $customer->birth_date     = $request->birth_date;
    $customer->indication_id  = $is_new_indication ? $indication->id : $customer->indication_id;
    $customer->save();

    return response()->json(['message' => 'Cliente atualizado com sucesso'], 200);
  }

  public function destroy(string $id)
  {
    $customer = Customer::where('id', '=', $id)->first();

    if (!$customer) {
      return response()->json([
        'message' => 'Cliente não encontrado'
      ], 404);
    }

    $customer->delete();

    return response()->json(['message' => 'Cliente removido com sucesso'], 200);
  }
}
