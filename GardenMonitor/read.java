import com.pubnub.api.*;
import com.pubnub.api.callbacks.SubscribeCallback;
import com.pubnub.api.models.consumer.PNStatus;
import com.pubnub.api.models.consumer.pubsub.PNMessageResult;
import com.pubnub.api.models.consumer.pubsub.PNPresenceEventResult;
import java.awt.*;
import java.awt.event.*;
import org.apache.commons.io.IOUtils;
import java.io.*;
import java.net.URL;
import java.net.URLConnection;
import java.util.*;
import javax.swing.*;
import javax.swing.UIManager;
import static com.pubnub.api.enums.PNOperationType.PNHeartbeatOperation;
import static com.pubnub.api.enums.PNOperationType.PNSubscribeOperation;
import static com.pubnub.api.enums.PNOperationType.PNUnsubscribeOperation;
import static com.pubnub.api.enums.PNStatusCategory.*;
import static javax.swing.WindowConstants.EXIT_ON_CLOSE;

public class read {

    static JTextField text = new JTextField();
    static JTextField text2 = new JTextField();
    static JTextField text3 = new JTextField();
    static JLabel label = new JLabel();
    static JLabel label2 = new JLabel();
    static JLabel label3 = new JLabel();
    static JTextField textpos = new JTextField();
    static String string = "Soil moisture: ";
    static String string2 = "Soil moisture 2: ";
    static String string3= "Humidity: ";
    public static void main(String[] args) throws FileNotFoundException, IOException {
        JButton btnNewButton = new JButton();
        URL url = new URL("https://cdoern.com/images/icons/icon-128x128.png");
        URLConnection uc = url.openConnection();
        uc.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36");
        ImageIcon icon = new ImageIcon(IOUtils.toByteArray(uc.getInputStream()));

        //btnNewButton.setIcon(icon);
        //  WebLookAndFeel.install();
        int result;
        JTextField amountkey = new JTextField();
        Object[] message2 = {
                "Amount:", amountkey
        };
        JOptionPane.showConfirmDialog(null, message2, "PubNub Keys", JOptionPane.OK_CANCEL_OPTION);
        int amount = Integer.parseInt(amountkey.getText());
        String[] subs = new String[amount];
        String[] pubs = new String[amount];
  /*  try (
            FileReader input = new FileReader("list2.txt");
            LineNumberReader count = new LineNumberReader(input);
            )
    {
        while (count.skip(Long.MAX_VALUE) > 0)
        {
        }
        result = count.getLineNumber();
        System.out.println(result);// +1 because line index starts at 0
    }
        int dialogButton = JOptionPane.YES_NO_OPTION;
    int dialogResult = JOptionPane.showConfirmDialog(null, "Would you like to use keys previously entered in the file?", "Previous Keys", dialogButton);
        if (dialogResult == JOptionPane.YES_OPTION && amount == result) {
            String[] list = new String[3];
            Scanner sc = new Scanner(new File("list2.txt"));
            int which = 0;
            int which2 = 0;
            int which3 = 0;
            while (sc.hasNext() ){
                String line = sc.next();
                Scanner lines = new Scanner(line);
                while (lines.hasNext()) {
                    System.out.println(which);
                    if (which % 2 == 0) {
                        subs[which2] = lines.next();
                        which++;
                        which2++;
                    } else {
                        pubs[which3] = lines.next();
                        which++;
                        which3++;
                    }

                }

            }
        }
    if(amount != result && dialogResult == JOptionPane.YES_OPTION){
        JOptionPane.showMessageDialog(null, "Incorrect number of keys in the file...");
    }
  if(dialogResult != JOptionPane.YES_OPTION || amount != result) {
  */
        //   PrintWriter writer = new PrintWriter("list2.txt","UTF-8");
        for (int i = 0; i < amount; i++) {
            JTextField subkey = new JTextField();
            JTextField pubkey = new JTextField();
            Object[] message = {
                    "Subscribe Key: ", subkey,
                    "Publish Key: ", pubkey
            };
            JOptionPane.showConfirmDialog(null, message, "PubNub Keys", JOptionPane.OK_CANCEL_OPTION);
            String sub = subkey.getText();
            String pub = pubkey.getText();
            //  writer.println(sub+" "+pub);
            System.out.println(sub + " " + pub);
            subs[i] = sub;
            pubs[i] = pub;
        }
        //  writer.close();
        //  }
        JPanel mainPanel = new JPanel();
        mainPanel.setBounds(0,0,600,800);
        mainPanel.setBackground(Color.ORANGE);
        mainPanel.setFocusable(true);
        mainPanel.requestFocusInWindow();
        mainPanel.setBorder(BorderFactory.createLineBorder(Color.GREEN));
        JFrame frame = new JFrame("Garden Monitor");
        frame.setDefaultCloseOperation(EXIT_ON_CLOSE);
        //  frame.setDefaultLookAndFeelDecorated(false);
        frame.getContentPane().add(mainPanel);
        text.setEditable(false);
        text.setBackground(Color.BLUE);
        text.setForeground(Color.GREEN);
        text.setBorder(BorderFactory.createLineBorder(Color.BLUE));
        Font f = new Font("Engravers MT", Font.BOLD, 10);
        text.setFont(f);
        text2.setEditable(false);
        text2.setBackground(Color.BLUE);
        text2.setForeground(Color.GREEN);
        text2.setText("Soil Moisture 2: ");
        text2.setFont(f);
        text3.setEditable(false);
        text3.setBackground(Color.BLUE);
        text3.setForeground(Color.GREEN);
        text3.setText("Humidity: ");
        text3.setFont(f);
        label.setSize(20, 20);
        label.setVisible(true);
        label.setLocation(0, 0);
        label.setFont(f);
        label2.setLocation(0, 0);
        label2.setFont(f);
        label3.setLocation(0, 0);
        label3.setFont(f);
        label.setSize(20,20);
        label2.setSize(20,20);
        label3.setSize(20,20);
    /*JEditorPane editorPane = new JEditorPane();
    try { String html; html="<html><head><title>Simple Page</title></head>"; html+="<body><iframe type=\"text/html\" frameborder=\"0\" width=\"480\" height=\"394\" src=\"//video.nest.com/embedded/live/aUfsHT3kQ3?autoplay=1\" allowfullscreen></iframe>"; html+="</body></html>";
        JEditorPane ed1=new JEditorPane("text/html",html);
        mainPanel.add(ed1);
 } catch(Exception e) {
        e.printStackTrace();

 System.out.println("Some problem has occured"+e.getMessage());
    }
    */
        //editorPane.setPage(new URL("https://video.nest.com/embedded/live/aUfsHT3kQ3?autoplay=1"));
        //  editorPane.setPage(new URL("https://video.nest.com/live/aUfsHT3kQ3"));
        //frame.add(new JScrollPane(editorPane));
        mainPanel.add(label);
        mainPanel.add(label2);
        mainPanel.add(label3);
        frame.getContentPane().setBackground(Color.ORANGE);
        frame.setSize(612, 635);
        frame.setIconImage(icon.getImage());

        frame.setVisible(true);

        for (int i = 0; i < pubs.length; i++) {
            PNConfiguration pnConfiguration = new PNConfiguration();
            pnConfiguration.setSubscribeKey(subs[i]);
            pnConfiguration.setPublishKey(pubs[i]);
            PubNub pubnub = new PubNub(pnConfiguration);
            pubnub.subscribe()
                    .channels(Arrays.asList("soil1", "humid", "soil2"))
                    .execute();
            pubnub.addListener(new SubscribeCallback() {
                public void status(PubNub pubnub, PNStatus status) {
                    if (status.getOperation() != null) {
                        switch (status.getOperation()) {
                            case PNSubscribeOperation:
                            case PNUnsubscribeOperation:
                                switch (status.getCategory()) {
                                    case PNConnectedCategory:
                                    case PNReconnectedCategory:
                                    case PNDisconnectedCategory:
                                    case PNUnexpectedDisconnectCategory:
                                    case PNAccessDeniedCategory:
                                    default:
                                }
                            case PNHeartbeatOperation:
                                if (status.isError()) {
                                } else {
                                }
                            default: {
                            }
                        }
                    } else {
                    }
                }
                public void message(PubNub pubnub, PNMessageResult message) {
                    if (message.getChannel().equals("soil1")) {
                        String str = message.getMessage().toString();
                        text.setText("Soil Moisture: " + str.substring(12, 14) + "%");
                        label.setText("Soil Moisture: " + str.substring(12, 14) + "%");
                        label.setBounds(0,0,600,200);
                        label.setBorder(BorderFactory.createLineBorder(Color.BLUE,2));
                    }
                    if (message.getChannel().equals("soil2")) {
                        String str = message.getMessage().toString();
                        System.out.println(str);
                        text2.setText("Soil Moisture 2: " + str.substring(12, 14) + "%");
                        label2.setText("Soil Moisture 2: " + str.substring(12, 14) + "%");
                        label2.setBounds(0,200,600,200);
                        label2.setBorder(BorderFactory.createLineBorder(Color.BLUE,2));
                    }
                    if (message.getChannel().equals("humid")) {
                        String str = message.getMessage().toString();
                        System.out.println(str);
                        text3.setText("Humidity: " + str.substring(12, 14) + "%");
                        label3.setText("Humidity: " + str.substring(12, 14) + "%");
                        label3.setBounds(0,400,600,200);
                        label3.setBorder(BorderFactory.createLineBorder(Color.BLUE,2));
                    }
                    String messagePublisher = message.getPublisher();
                    System.out.println("Message publisher: " + messagePublisher);
                    System.out.println("Message Payload: " + message.getMessage());
                    System.out.println("Message Subscription: " + message.getSubscription());
                    System.out.println("Message Channel: " + message.getChannel());
                    System.out.println("Message timetoken: " + message.getTimetoken());
                }

                public void presence(PubNub pubnub, PNPresenceEventResult presence) {
                }
            });
        }
    }
}
