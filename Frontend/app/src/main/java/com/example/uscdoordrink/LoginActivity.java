package com.example.uscdoordrink;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class LoginActivity extends AppCompatActivity {

    private EditText Name;
    private EditText Password;
    private TextView Info;
    private TextView SignupInfo;
    private Button login;
    private Button signup;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        Name = (EditText)findViewById(R.id.etName);
        Password = (EditText)findViewById(R.id.etPassword);
        SignupInfo = (TextView)findViewById(R.id.haveaccount);
        Info = (TextView)findViewById(R.id.incorrect);
        login = (Button)findViewById(R.id.suButton);
        signup = (Button)findViewById(R.id.signupButton);

        Info.setText("");

        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                validate(Name.getText().toString(), Password.getText().toString());
            }
        });

        signup.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                openSignUp();
            }
        });
    }

    //Enter name for signup page
    private void openSignUp(){
        Intent intent = new Intent(this, SignupActivity.class);
        startActivity(intent);
    }

    private void validate(String userName, String userPassword){
        if((userName == "Celia") && (userPassword == "1234")){
            Intent intent = new Intent(LoginActivity.this, MainPgeActivity.class);
            startActivity(intent);
        }
        else{
            Info.setText("Username or Password Incorrect");
        }
    }
}