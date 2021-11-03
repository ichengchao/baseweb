package baseweb.common;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CommonConstants {

    private static final Logger logger = LoggerFactory.getLogger(CommonConstants.class);

    public static final String DEMO_KEY;

    public static final String CONFIG_FILE_NAME = "/baseweb.properties";

    static {
        Properties properties = loadProperties();
        DEMO_KEY = properties.getProperty("DEMO_KEY");
        logger.info("============================CONFIG=========================");
        logger.info("DEMO_KEY:" + DEMO_KEY);
        logger.info("============================================================");
    }

    public static Properties loadProperties() {
        Properties properties = new Properties();
        try {
            File file = new File(System.getProperty("user.dir") + CONFIG_FILE_NAME);
            if (!file.exists()) {
                file = new File(System.getProperty("user.home") + "/config" + CONFIG_FILE_NAME);
            }
            if (!file.exists()) {
                throw new RuntimeException("can not find config file!");
            }
            InputStream ins = new FileInputStream(file);
            InputStreamReader reader = new InputStreamReader(ins, "UTF-8");
            properties.load(reader);
            ins.close();
            reader.close();
            logger.info("load config file:" + file.getAbsolutePath());
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            System.exit(0);
        }
        return properties;
    }

}
