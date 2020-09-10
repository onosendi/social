from django.contrib.auth.forms import AuthenticationForm
from django.forms import (
    ModelForm,
    BooleanField,
    PasswordInput,
)
from django.contrib.auth.password_validation import validate_password

from users.models import User


class LoginForm(AuthenticationForm):
    remember_me = BooleanField(label='Remember me', required=False)


class RegistrationForm(ModelForm):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        widgets = {
            'password': PasswordInput(),
        }

    def clean_password(self):
        password = self.cleaned_data['password']
        validate_password(password)
        return password

    def save(self, commit=True):
        user = super(RegistrationForm, self).save(commit=False)
        user.set_password(self.cleaned_data['password'])
        if commit:
            user.save()
        return user
