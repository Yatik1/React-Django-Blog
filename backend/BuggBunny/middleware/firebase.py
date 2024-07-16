import firebase_admin
from firebase_admin import auth
from django.http import JsonResponse
from django.conf import settings



def firebase_auth_middleware(get_response):
    
    def middleware(request):
        print('Middleware called')
        auth_header = request.headers.get("Authorization")
        # print(auth_header)
        if auth_header and auth_header.startswith("Bearer "):
            
            id_token = auth_header.split(" ")[1]
            print('token',id_token)
            print('is token verify',auth.verify_id_token(id_token))
            try:
                # print('is token verify',auth.verify_id_token(id_token))
                decoded_token = auth.verify_id_token(id_token)
                print('decode_token',decoded_token)
                request.firebase_user = decoded_token  # Attach the Firebase user
            except Exception as e:
                # Token verification failed
                return JsonResponse({"error": str(e)}, status=401)

        return get_response(request)

    return middleware
