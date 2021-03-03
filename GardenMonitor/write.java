import javax.swing.*;
import java.io.*;

public class write {
    public static void main(String[] args) throws FileNotFoundException, UnsupportedEncodingException{
        JTextField amountkey = new JTextField();
        Object[] message2 = {
               "Amount:", amountkey
        };
       JOptionPane.showConfirmDialog(null, message2,"PubNub Keys", JOptionPane.OK_CANCEL_OPTION);
   int amount = Integer.parseInt(amountkey.getText());
        PrintWriter writer = new PrintWriter("list.txt","UTF-8");
      for(int i = 0; i < amount; i++) {
          JTextField subkey = new JTextField();
          JTextField pubkey = new JTextField();
          JTextField channel = new JTextField();
          Object[] message = {
                  "Channel: ", channel,
                  "Subscribe Key: ", subkey,
                  "Publish Key: ", pubkey
          };
          JOptionPane.showConfirmDialog(null, message, "PubNub Keys", JOptionPane.OK_CANCEL_OPTION);
          String sub = subkey.getText();
          String pub = pubkey.getText();
          String chan = channel.getText();
          System.out.println(chan+sub+pub);
          writer.println(chan+" "+sub +" "+ pub);
      }
        writer.close();
    }
}
