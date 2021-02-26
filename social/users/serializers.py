from rest_framework import serializers

from .models import Profile, User


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            "banner",
            "bio",
            "image",
            "location",
            "website",
        ]


class ValidatePasswordMixin:
    def validate(self, data):
        password = data.get("password")
        password2 = data.get("password2")
        if password and password2 and password != password2:
            raise serializers.ValidationError(
                {
                    "password2": "Passwords do not match.",
                }
            )
        return data


class UserSerializer(ValidatePasswordMixin, serializers.ModelSerializer):
    display_name = serializers.SerializerMethodField(read_only=True)
    followers = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    following = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    profile = ProfileSerializer(read_only=True)
    slug = serializers.SlugField(read_only=True)

    class Meta:
        model = User
        fields = [
            "created_at",
            "display_name",
            "email",
            "followers",
            "following",
            "id",
            "name",
            "password",
            "password2",
            "profile",
            "slug",
            "username",
        ]

    def create(self, validated_data):
        del validated_data["password2"]
        return User.objects.create_user(**validated_data)

    def get_display_name(self, obj):
        return obj.display_name()


class PasswordSerializer(ValidatePasswordMixin, serializers.ModelSerializer):
    current_password = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "current_password",
            "password",
            "password2",
        ]

    def validate_current_password(self, data):
        request = self.context.get("request")
        r_user = request.user
        if not r_user.check_password(data):
            raise serializers.ValidationError("Incorrect password.")
        return data
